const Order = require('../models/order');
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");
<<<<<<< HEAD
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
  
=======

exports.addOrder = async ( req, res ) => {
    const {user, itemList, country, firstName, lastName, streetAddress, city, province, zipCode, phoneNumber, orderValue} = req.body;
    try{
        const newOrder = new Order({
        user,
        itemList,
        country,
        firstName,
        lastName,
        streetAddress,
        city,
        province,
        zipCode,
        phoneNumber,
        orderValue
        });
        const addOrder = await newOrder.save();
        if(addOrder){
           return successResponse(res, "order added successfully", newOrder);
        } else {
            return errorResponse(res, null , "Order didn't able to add");
        }
    } catch (err) {
       return errorResponse(res, null, "Something went wrong", err);
    }
}
>>>>>>> origin/dev
