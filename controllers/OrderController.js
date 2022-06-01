const Order = require('../models/order');
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");

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