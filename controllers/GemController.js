const Gem = require("../models/gem");
const GemType = require("../models/gemType");

const {
  ackResponse,
  errorResponse,
  successResponse,
} = require("../shared/responses");

exports.gemAdd = function (req, res) {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const { status, quantity, hardness, weight, colour, origin } = req.body;

  const newGem = new Gem({
    status,
    quantity,
    hardness,
    weight,
    colour,
    origin,
  });
  newGem
    .save()
    .then((gem) => res.json(gem))
    .catch((err) => console.log(err));

  GemType.find({}).then((gemType) => {
    successResponse(res, "Product added successfully!", gemType);
    //get this to another function when fend created
  });
};

exports.getAllGems = function (req,res){

  Gem.find({status:"available"}).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  })

}