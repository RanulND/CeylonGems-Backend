const Auction = require("../models/auction");


const {
  ackResponse,
  errorResponse,
  successResponse,
} = require("../shared/responses");

exports.auctionAdd = function (req, res) {
  // Form validation
  // const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const { sellerId,title,desc,curPrice,duration, itemImage} = req.body;

  const newAuction = new Auction({
   

          sellerId,
          title,
          desc,
          curPrice,
          duration,
          itemImage,
  });
  newAuction
    .save()
    .then((auction) => res.json(auction))
    .catch((err) => console.log(err));

//   GemType.find({}).then((gemType) => {
//     successResponse(res, "Product added successfully!", gemType);
//     //get this to another function when fend created
//   });
};

exports.getAllAuctions = function (req,res){

  Auction.find({status:true}).then((auctions)=>{
    res.json(auctions)
  }).catch((err)=>{
    console.log(err)
  })

}

// exports.getThreeAuctionGems = function (req,res){
//   const query = {status:true , format:'Auction-Style'};
//   const sort = { $natural: -1 };
//   const limit = 3;
//   Gem.find(query).sort(sort).limit(limit).then((gems)=>{
//     res.json(gems)
//   }).catch((err)=>{
//     console.log(err)
//   });
// }
// exports.getThreeDirectGems = function (req,res){
//   const query = {status:true , format:'test'};
//   const sort = { $natural: -1 };
//   const limit = 3;
//   Gem.find(query).sort(sort).limit(limit).then((gems)=>{
//     res.json(gems)
//   }).catch((err)=>{
//     console.log(err)
//   });
// }

// exports.getProduct = function (req,res){
//  Gem.findById(req.params.id).then(product =>{
//    if(product){
//      res.json(product)
//    } else {
//     return errorResponse(res, 404,res.err, null)
//    }
//  });
// }

exports.getAuctionDetails = function (req,res){
  const email_id = req.body.id;
  Auction.find({email : email_id}).then(auction=> {
   if(auction){
       return res.json(auction)
   }


})
}

