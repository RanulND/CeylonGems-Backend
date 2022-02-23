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
  const { status,title,category,photos,description,size,weight,hardness,colour,origin,quantity,gem_certificate,format,base_value,auc_duration,} = req.body;

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
