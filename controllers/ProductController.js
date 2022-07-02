const Gem = require("../models/gem");
const GemType = require("../models/gemType");
const Jewellery = require("../models/jewellery");
const Order = require("../models/order");

const { ackResponse, errorResponse, successResponse } = require("../shared/responses");

//add Gem

exports.gemAdd = function (req, res) {
  const { status, title, category, photos, description, size, weight, hardness, colour, origin, quantity, gem_certificate, format, base_value, auc_duration, product, verified } = req.body;

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
    verified,
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

exports.getGemType = async (_, res) => {
  try {
    const docs = await GemType.find({});
    return successResponse(res, docs, "Gems fetched successfully.");
  } catch (err) {
    return generalErrorPayloadResponse(res, err);
  }
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

exports.findOrder = async (req, res) => {
  Order.find({})
    .then((user) => {
      var arr = user;
      let obj = arr.find((o, i) => {
        let obj1 = o.itemList.find((x, y) => {
          if (x.product == req.params.detailId) {
            console.log("x.product");
            res.send("Product is Ordered, cannot be deleted!!!");
          }
        });
      });
      res.send("No item");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete product
exports.deleteGem = async (req, res) => {
  Order.find({})
    .then((user) => {
      var arr = user;
      let obj = 0
      arr.find((o, i) => {
        o.itemList.find((x, y) => {
          if (x.product == req.params.detailId) {
            console.log("x.product");
            obj = 1;
            res.send("Product is Ordered, Cannot delete!!!");
          }
        });
      });
      // res.send("No item");
      if (obj != 1){
        try {
          Gem.findByIdAndDelete(req.params.detailId)
            .then(() => {
              res.send("Deleted Successfully!");
            })
            .catch((err) => {
              return res.status(500).send({
                message: "Error in deleting the product data" + err,
              });
            });
        } catch (err) {
          console.log(err)
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete product
exports.deleteJewel = async (req, res) => {
  Order.find({})
    .then((user) => {
      var arr = user;
      let obj = 0
      arr.find((o, i) => {
        o.itemList.find((x, y) => {
          if (x.product == req.params.detailId) {
            console.log("x.product");
            obj = 1;
            res.send("Product is Ordered, Cannot delete!!!");
          }
        });
      });
      // res.send("No item");
      if (obj != 1){
        try {
          Jewellery.findByIdAndDelete(req.params.detailId)
            .then(() => {
              res.send("Deleted Successfully!");
            })
            .catch((err) => {
              return res.status(500).send({
                message: "Error in deleting the product data" + err,
              });
            });
        } catch (err) {
          console.log(err)
        }
      }
    })
    .catch((err) => {
      console.log(err);
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
    verified: req.body.verified,
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
  Jewellery.findByIdAndUpdate(req.params.detailId, {
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
  const { status, title, photos, description, purity, quantity, price, product } = req.body;

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

exports.getJewelleryDetails = function (req, res) {
  const email_id = req.body.id;
  Jewellery.find({ email: email_id }).then((jewellery) => {
    if (jewellery) {
      return res.json(jewellery);
    }
  });
};

exports.getAllAuctionGems = function (req, res) {
  Gem.find({ status: true, format: "Auction" })
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllDirectGems = function (req, res) {
  Gem.find({ status: true, format: "Direct" })
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getThreeAuctionGems = function (req, res) {
  const query = { status: true, format: "Auction", verified: true };
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query)
    .sort(sort)
    .limit(limit)
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getThreeDirectGems = function (req, res) {
  const query = { status: true, format: "Direct", verified: true };
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query)
    .sort(sort)
    .limit(limit)
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getThreeJewellery = function (req, res) {
  const query = { status: true };
  const sort = { $natural: -1 };
  const limit = 3;
  Jewellery.find(query)
    .sort(sort)
    .limit(limit)
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getGemProduct = function (req, res) {
  Gem.findById(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      return errorResponse(res, 404, res.err, null);
    }
  });
};
exports.getJewelryProduct = function (req, res) {
  Jewellery.findById(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      return errorResponse(res, 404, res.err, null);
    }
  });
};
exports.getJewelryProduct = function (req, res) {
  Jewellery.findById(req.params.id).then((product) => {
    if (product) {
      res.json(product);
    } else {
      return errorResponse(res, 404, res.err, null);
    }
  });
};

exports.getSellerGems = function (req, res) {
  const query = { seller_id: req.params.seller_id };
  const sort = { $natural: -1 };
  Gem.find(query)
    .sort(sort)
    .then((gems) => {
      res.json(gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllJewelry = async (req, res) => {
  try {
    const jewelry = await Jewellery.find({ status: true });
    if (jewelry) {
      return successResponse(res, "Got data successfully", jewelry);
    } else {
      return errorResponse(res, null, "Data not found", null);
    }
  } catch (err) {
    return errorResponse(res, null, "Something went wrong", err);
  }
};

exports.gemCountBySeller = function (req, res) {
  const { id } = req.body;
  Gem.countDocuments({ seller_id: id })
    .then((notSoldCount) => {
      Gem.countDocuments({ seller_id: id, status: false })
        .then((soldCount) => {
          const counts = {
            sold: soldCount,
            notSold: notSoldCount,
          };
          successResponse(res, "fetched gem count by sellerID", counts);
        })
        .catch((error) => {
          errorResponse(res, null, null, error);
        });
    })
    .catch((err) => {
      errorResponse(res, null, null, err);
    });
};

exports.getSellerGemsProfile = function (req, res) {
  const seller_id = req.body.seller_id;
  Gem.find({ seller_id: seller_id })
    .then((gems) => {
      successResponse(res, null, gems);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSellerJewelleriesProfile = function (req, res) {
  const seller_id = req.body.seller;
  Gem.find({ seller: seller_id })
    .then((jewellery) => {
      res.json(jewellery);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNonVerified = function (req, res) {
  Gem.find({ verified: false })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
