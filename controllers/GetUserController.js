 const User = require('../models/user')

const { userSignIn } = require("./AuthController");


 exports.getUserDetails = function (req,res){
   const email_id = req.body.id;
   User.findOne({email : email_id}).then(user => {
    if(user){
        return res.json(user)
    }


})
 }
  