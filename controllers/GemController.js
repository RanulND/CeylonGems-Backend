const Gem = require("../models/gem")
const bcrypt = require("bcrypt")
const { ackResponse, errorResponse, successResponse } = require("../shared/responses")

exports.gemAdd=function(req, res){


    // Form validation
      const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
        if (!isValid) {
        return res.status(400).json(errors);
        }
        const {status, quantity, hardness, weight, colour, origin } = req.body;
        const newUser = new User({
              status,
              quantity,
              hardness,
              weight,
              colour,
              origin
    });
};

//try to fetch gem types
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //Find all documents in the customers collection:
  dbo.collection("gemType").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
