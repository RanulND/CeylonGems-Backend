const Gem = require("../models/gem");
const GemType = require("../models/gemType");
const Jewellery = require("../models/jewellery");

const {
  ackResponse,
  errorResponse,
  successResponse,
} = require("../shared/responses");

//add Gem

exports.gemAdd = function (req, res) {

  const {
    status,
    title,
    category,
    photos,
    description,
    size,
    weight,
    hardness,
    colour,
    origin,
    quantity,
    gem_certificate,
    format,
    base_value,
    auc_duration,
    product
  } = req.body;

  const newGem = new Gem({
    status,
    title,
    category,
    photos,
    description,
    size,
    weight,
    hardness,
    colour,
    origin,
    quantity,
    gem_certificate,
    format,
    base_value,
    auc_duration,
    product
  });
  newGem
    .save()
    .then((gem) => res.json(gem))
    .catch((err) => console.log(err));
};

//Get gem type
exports.gemType = function (req, res) {
  GemType.find({}).then((gemType) => {
    successResponse(res, gemType);
  });
};

//Get product details
exports.getProductDetails = function (req, res) {
  Gem.findById(req.params.detailId).then((details) => {
    if(details){
      successResponse(res, details);
    }else{
      Jewellery.findById(req.params.detailId).then((details) => {
        if(details){
          successResponse(res, details);
        }
        else{
          return res.status(404).send({
            message: "Product not found !",
          });
        }
      })
    }
    
  })
  .catch((err) => {
    return res.status(500).send({
      message: "Error in finding the Product data "+err,
    });
  });
};

// Should be updated !!!!!!
// Update Gem details
exports.updateGem = async (req, res) => {
    var nic = req.body.nic;

    User.findOneAndUpdate(
      { nic: nic },
      {
        status: req.body.status,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        gender: req.body.gender,
      }
    )
      .then((user) => {
        if (user) {
          res.send(user);
        } else {
          return res.status(404).send({
            message: "User not found !",
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error in updating the User data"+err,
        });
      });
  
};


// Update Jewellery details
exports.updateJewellery = async (req, res) => {

}

//add Jewellery
exports.jewelleryAdd = function (req, res) {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const {
    status,
    title,
    photos,
    description,
    purity,
    quantity,
    price,
    product
  } = req.body;

  const newJewellery = new Jewellery({
    status,
    title,
    photos,
    description,
    purity,
    quantity,
    price,
    product
  });
  newJewellery
    .save()
    .then((jewellery) => res.json(jewellery))
    .catch((err) => console.log(err));
};


exports.getJewelleryDetails = function (req,res){
  const email_id = req.body.id;
  Jewellery.find({email : email_id}).then(jewellery=> {
   if(jewellery){
       return res.json(jewellery)
   }


})
}
