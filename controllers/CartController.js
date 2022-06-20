const Cart = require('../models/cart');
const User = require('../models/user');
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");

exports.addItemToCart = async (req, res) => {
    try {
        const user = await Cart.findOne({ user: req.body.user })
        if (user) {
            const product = req.body.cartItems.product;
            const item = await user.cartItems.find(c => c.product == product);
            if (item) {
                const cartItem = await Cart.findOneAndUpdate({ user: req.body.user, "cartItems.product": product }, {
                    $set: {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                });
                if (cartItem) {
                    return successResponse(res, "Added the item successfully", null);
                } else {
                    return errorResponse(res, null, "cart item not found");
                }
            } else {
                const cartItem = await Cart.findOneAndUpdate({ user: req.body.user }, {
                    $push: { cartItems: [req.body.cartItems] }
                })
                if (cartItem) {
                    return successResponse(res, "Added the item successfully", null);
                } else {
                    return errorResponse(res, null, "cart item not found");
                }
            }
        } else {
            const cart = await new Cart({
                user: req.body.user,
                cartItems: [req.body.cartItems]
            });
            if (cart) {
                cart.save();
                return successResponse(res, "added successfully", cart);
            }
            else {
                return errorResponse(res, null, "something bad happened");
            }
        }
    } catch (err) {
        return errorResponse(res, null, "Something wrong", err);
    }
}

exports.removeItemFromCart = async ( req,res ) => {
    try{
        const user = await Cart.findOne({ user: req.body.user })
        console.log(user);
        if(user){
            const product = req.body.product;
            const item = await user.cartItems.find(c => c.product == product);
            if(item){
                    const del = await Cart.findOneAndUpdate({user: req.body.user, "cartItems.product": product },{
                        $pull: {
                            "cartItems":{
                                product: req.body.product
                            }
                        }
                    });
                    if(del){
                        return successResponse(res, "Removed the item successfully", null);
                    }
            }else {
                return errorResponse(res, null, "item not found");
            }
        }
    } catch (err){
        return errorResponse(res, null, "Something wrong", err);
    }
}

exports.increaseCart = async (req,res) => {
    const product = req.body.product;
    try{
        const user = await Cart.findOne({user: req.body.user})
        if(user){
            const item = await user.cartItems.find(c => c.product == product);
            const updte = await Cart.findOneAndUpdate({user: req.body.user, "cartItems.product": product },{
                $set: {
                    "cartItems.$.quantity": item.quantity + 1     
                }
            });
            console.log(updte);
            if(updte){
                return successResponse(res, "increase the item by 1 successfully", null);
            }else{
                return errorResponse(res, null, "Something wrong");
            }
        }
    } catch(err){
        return errorResponse(res, null, "Something went wrong", err);
    }
}
exports.decreaseCart = async (req,res) => {
    const product = req.body.product;
    try{
        const user = await Cart.findOne({user: req.body.user})
        if(user){
            const item = await user.cartItems.find(c => c.product == product);
            const updte = await Cart.findOneAndUpdate({user: req.body.user, "cartItems.product": product },{
                $set: {
                    "cartItems.$.quantity": item.quantity - 1     
                }
            });
            console.log(updte);
            if(updte){
                return successResponse(res, "decrease the item by 1 successfully", null);
            }else{
                return errorResponse(res, null, "Something wrong");
            }
        }
    } catch(err){
        return errorResponse(res, null, "Something went wrong", err);
    }
}

exports.removeItem = async (req,res) => {
    const product = req.body.product;
    try{
        const user = await Cart.findOne({user: req.body.user})
        if(user){
            const updte = await Cart.findOneAndUpdate({user: req.body.user, "cartItems.product": product },{
                $pull: {
                    "cartItems":{
                        product: req.body.product
                    }
                }
            });
            console.log(updte);
            if(updte){
                return successResponse(res, "Removed the item by 1 successfully", null);
            }else{
                return errorResponse(res, null, "Something wrong");
            }
        }
    } catch(err){
        return errorResponse(res, null, "Something went wrong", err);
    }
}

exports.getCart = async (req,res) => {
    try{
        const user = await Cart.findOne({user: req.body.user});
        if(user){
            console.log(user.cartItems);
            return successResponse(res, 'Getting user data is successfull',user);
        } else {
            return errorResponse(res,null, 'User not found', null);
        }
    } catch(err){
        return errorResponse(res,null, "Something went wrong", err);
    }
}