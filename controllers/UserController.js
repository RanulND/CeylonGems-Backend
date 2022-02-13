const User = require('../models/user')

const { userSignUp } = require('./AuthController')

exports.viewsellerprofile = async function(req,res){
   

    
      User.findOne({email: req.body.id}).then(profile =>{

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        };
        res.json(profile);
    })

   
    
}
    
    
    
