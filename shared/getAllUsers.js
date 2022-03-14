const User = require('../models/user')
const { successResponse, errorResponse } = require('./responses')

exports.getallusers = (req, res) => {
    User.find().then(users => {
        successResponse(res, "Users fetched successfully", users)
    }).catch(err => {
        errorResponse(res, 403, err)
    })
}