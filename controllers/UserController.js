const User = require('../models/user');
const { successResponse, errorResponse } = require('../shared/responses');

exports.getUserDetails = function (req, res) {
    const email_id = req.body.id;
    User.findOne({ email: email_id }).then(user => {
        if (user) {
            return successResponse(res, 'User fetched successfully', user)
        }else{
            return errorResponse(res, 404, 'User not found', null)
        }
    })
}
