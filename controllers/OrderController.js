const Order = require('../models/order');
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");
const Gem = require('../models/gem')
const Jewellery = require('../models/jewellery')
const User = require('../models/user')

exports.addOrder = async (req, res) => {
    const { buyer, itemList, country, streetAddress, city, province, zipCode, orderValue } = req.body;


    // const user = await User.findById(buyer)

    // itemList.forEach(async (item) => {
    //     item.product = await Gem.findById(item.product)
    // });

    try {
        const shippingAddress = {
            country: country,
            streetAddress: streetAddress,
            city: city,
            province: province,
            zipCode: zipCode,
        }

        const newOrder = new Order({
            user: buyer,
            itemList: itemList,
            shippingAddress: shippingAddress,
            orderValue: orderValue
        });
        const addOrder = await newOrder.save();
        if (addOrder) {
            return successResponse(res, "order added successfully", newOrder);
        } else {
            return errorResponse(res, null, "Order didn't able to add");
        }
    } catch (err) {
        return errorResponse(res, null, "Something went wrong", err);
    }
}

exports.getAllOrders = (req, res) => {
    Order.find().then(orders => {
        return successResponse(res, "orders fetched successfully", orders)
    }).catch(err => {
        console.log(err)
        return errorResponse(res, null, null, err)
    })
}

exports.getOrder = (req, res) => {
    Order.findById(req.params.id).then(order => {
        successResponse(res, "Order fetched successfully", order)
    }).catch(err => {
        errorResponse(res, null, null, err)
    })
}

exports.getOrdersByBuyer = (req, res) => {
    const { buyerID } = req.body
    Order.find({user : buyerID}).then(orders => {
        successResponse(res, "Orders fetched by buyer", orders)
    }).catch(err => {
        errorResponse(res, null, null, err)
    })
    // populate(user, buyerID).then
}

exports.getOrderDetails = function (req, res) {
    const id = req.body.id;
    Order.findById({ _id: id }).then(order => {
        if (order) {
          return res.json(order)
        }
      }).catch(err =>{
      
        return errorResponse(res, 400, "Something went wrong.", null);
      });
}

//Get product details
exports.getProductDetails = function (req, res) {
    const id = req.body.id;
    Gem.findById(id).then((details) => {
      if (details) {
        successResponse(res, details);
      } else {
        Jewellery.findById(id).then((details) => {
          if (details) {
            successResponse(res, details);
          }
          else {
            return res.status(404).send({
              message: "Product not found !",
            });
          }
        })
      }
    }).catch((err) => {
        return res.status(500).send({
          message: "Error in finding the Product data " + err,
        });
      });
  };
  

//get order and payment details to admin panel

exports.getOrdersToPaySeller = async (req,res) => {
    try{
        const orders = await Order.find({buyerPaymentStatus:true, sellerPaymentStatus:false})
        if(orders){
            console.log(orders);
            return successResponse(res,"Found orders successfully",orders);
        }else {
            return errorResponse(res, null , "No orders found pay to seller", );
        }
    }catch (err) {
        return errorResponse(res, null, "Something went wrong", err);
    }
}

exports.getProductDetailsAdmin = function (req, res) {
    const id = req.body.id;
    Gem.findById(id).then((details) => {
        console.log('func called');
      if (details) {
        successResponse(res, details);
      } else {
        Jewellery.findById(id).then((details) => {
          if (details) {
            successResponse(res, details);
          }
          else {
            return res.status(404).send({
              message: "Product not found !",
            });
          }
        })
      }
    }).catch((err) => {
        return res.status(500).send({
          message: "Error in finding the Product data " + err,
        });
      });
  };