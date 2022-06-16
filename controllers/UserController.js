const User = require('../models/user');
const { successResponse, errorResponse } = require('../shared/responses');

exports.getUserDetails = function (req, res) {
    const email_id = req.body.id;
    User.findOne({ email: email_id }).then(user => {
        if (user) {
            return successResponse(res, 'User fetched successfully', user)
        } else {
            return errorResponse(res, 404, 'User not found', null)
        }
    })
}

exports.getUserById = (req, res) => {
    const {id} = req.body
    User.findById(id).then(user => {
        successResponse(res, 'User retrived Successfully', user)
    }).catch(err => {
        errorResponse(res, null, null, err)
    })
}   

exports.getUsersByDate = (req, res) => {
    const weekAgoDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    const aggregatorOpts = [
        {
            $match: {
                'createdAt': { $gte: weekAgoDate, $lt: new Date() }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
    ]

    User.aggregate(aggregatorOpts).then(result => {
        const dateArr = new Array(10)
            .fill(0)
            .map((_, i) => new Date(Date.now() - (i) * 24 * 60 * 60 * 1000))
            .map(e => {
                const date = e.toISOString().split('T')[0];
                const obj = result.find(f => f._id === date);
                if (obj) {
                    return obj
                }

                return { _id: date, count: 0 };
            })
            
        return successResponse(res, "Orders retrived by date successfully", dateArr.reverse())
    }).catch(err => {
        return errorResponse(res, null, null, err)
    })
}
