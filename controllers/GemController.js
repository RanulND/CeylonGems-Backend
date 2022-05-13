const Gem = require("../models/gem");
const Jewellery = require("../models/jewellery")
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

exports.getAllAuctionGems = function (req,res){
  Gem.find({status:true,format:'Auction'}).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  })
}

exports.getAllDirectGems = function (req,res){
  Gem.find({status:true,format:'Direct'}).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  })

}

exports.getThreeAuctionGems = function (req,res){
  const query = {status:true , format:'Auction'};
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query).sort(sort).limit(limit).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}
exports.getThreeDirectGems = function (req,res){
  const query = {status:true , format:'Direct'};
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query).sort(sort).limit(limit).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}
exports.getThreeJewellery = function (req,res){
  const query = {status:true};
  const sort = { $natural: -1 };
  const limit = 3;
  Jewellery.find(query).sort(sort).limit(limit).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}

exports.getGemProduct = function (req,res){
 Gem.findById(req.params.id).then(product =>{
   if(product){
     res.json(product)
   } else {
    return errorResponse(res, 404,res.err, null)
   }
 });
}
exports.getJewelryProduct = function (req,res){
  Jewellery.findById(req.params.id).then(product =>{
    if(product){
      res.json(product)
    } else {
     return errorResponse(res, 404,res.err, null)
    }
  });
 }

exports.getSellerGems = function (req,res){
  const query = {seller_id:req.params.seller_id };
  const sort = { $natural: -1 };
  Gem.find(query).sort(sort).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}
  exports.getAllJewelry = function (req,res){
    Jewellery.find({status:true}).then((jewelry)=>{
      res.json(jewelry)
    }).catch((err)=>{
      console.log(err)
    })
  }
