const Admin = require('../models/admin')
const User = require('../models/user')
const { ackResponse, errorResponse, successResponse } = require('../shared/responses')
const bcrypt = require("bcrypt")

exports.addAdmin = function (req, res) {
    const { firstName, lastName, nic, password, email, adminLevel, phone } = req.body

    Admin.findOne({ email: email }).then(admin => {
        if (admin) {
            errorResponse(res, 403, "Admin Exist", admin)
        } else {
            const newAdmin = new Admin({
                firstName,
                lastName,
                nic,
                password: bcrypt.hashSync(password, 10),
                email,
                adminLevel,
                phone
            })
            newAdmin.save()
            successResponse(res, "user added Successfully", newAdmin)
        }
    }).catch(err => {
        errorResponse(res, null, null, err)
    })
}

exports.getAdmin = function (req, res) {
    Admin.find().then(admins => {
        res.json(admins);
    }).catch(err => {
        res.json(err)
    })
}

exports.removeAdmin = function (req, res) {
    const id = req.body.id;
    Admin.deleteOne({ _id: id }).then(() => {
        successResponse(res, "User deleted succesfully",)
    }).catch(err => {
        errorResponse(res, 403, "user deletion unsuccessful", err)
    })
}