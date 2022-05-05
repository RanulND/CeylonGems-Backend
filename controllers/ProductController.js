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
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
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
    product,
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
    product,
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
  Gem.findById(req.params.detailId)
    .then((details) => {
      if (details) {
        successResponse(res, details);
      } else {
        Jewellery.findById(req.params.detailId).then((details) => {
          if (details) {
            successResponse(res, details);
          } else {
            return res.status(404).send({
              message: "Product not found !",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error in finding the Product data " + err,
      });
    });
};


// Update Gem details
exports.updateGem = async (req, res) => {
  Gem.findByIdAndUpdate(req.params.detailId, {
    status: req.body.status,
    title: req.body.title,
    category: req.body.category,
    photos: req.body.photos,
    description: req.body.description,
    size: req.body.size,
    weight: req.body.weight,
    hardness: req.body.hardness,
    colour: req.body.colour,
    origin: req.body.origin,
    quantity: req.body.quantity,
    gem_certificate: req.body.gem_certificate,
    format: req.body.format,
    base_value: req.body.base_value,
    auc_duration: req.body.auc_duration,
    price: req.body.price,
    product: req.body.product,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        return res.status(404).send({
          message: "product not found !",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error in updating the product data" + err,
      });
    });
};


// Update Jewellery details
exports.updateJewellery = async (req, res) => {
  Gem.findByIdAndUpdate(req.params.detailId, {
    status: req.body.status,
    title: req.body.title,
    photos: req.body.photos,
    description: req.body.description,
    purity: req.body.purity,
    quantity: req.body.quantity,
    price: req.body.price,
    product: req.body.product,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        return res.status(404).send({
          message: "product not found !",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error in updating the product data" + err,
      });
    });
};

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
    product,
  } = req.body;

  const newJewellery = new Jewellery({
    status,
    title,
    photos,
    description,
    purity,
    quantity,
    price,
    product,
  });
  newJewellery
    .save()
    .then((jewellery) => res.json(jewellery))
    .catch((err) => console.log(err));
};
