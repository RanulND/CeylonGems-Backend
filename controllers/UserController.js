const User = require('../models/user')

const { userSignUp } = require('./AuthController')

exports.viewsellerprofile = async function(req,res){
   
      User.findOne({email: req.body.id}).then(profile =>{

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        };
        res.json(user);
    })     
}

exports.getAllUsers = function (req,res) {
    User.find({}).then(user =>{
        if(user){
          res.json(user)
    } 
    }
    );
   
}

exports.getUserDetails = function (req,res){
    const email_id = req.body.id;
    User.findOne({email : email_id}).then(user => {
     if(user){
         return res.json(user)
     }
 })
  }
