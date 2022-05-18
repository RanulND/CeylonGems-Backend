const Cart = require('../models/cart');
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