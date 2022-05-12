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

exports.getAllGems = function (req,res){

  Gem.find({status:true}).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  })

}

exports.getThreeAuctionGems = function (req,res){
  const query = {status:true , format:'Auction-Style'};
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query).sort(sort).limit(limit).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}
exports.getThreeDirectGems = function (req,res){
  const query = {status:true , format:'test'};
  const sort = { $natural: -1 };
  const limit = 3;
  Gem.find(query).sort(sort).limit(limit).then((gems)=>{
    res.json(gems)
  }).catch((err)=>{
    console.log(err)
  });
}

exports.getProduct = function (req,res){
 Gem.findById(req.params.id).then(product =>{
   if(product){
     res.json(product)
   } else {
    return errorResponse(res, 404,res.err, null)
   }
 });
}

exports.getGemDetails = function (req,res){
  const email_id = req.body.id;
  Gem.find({email : email_id}).then(gem=> {
   if(gem){
       return res.json(gem)
   }


})
}

