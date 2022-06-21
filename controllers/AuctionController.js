const Auction = require("../models/auction");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");

exports.auctionAdd = function (req, res) {

  const { sellerId, title, desc, basePrice, startDate, endDate, itemImage } = req.body;

  const newAuction = new Auction({
    sellerId,
    title,
    desc,
    basePrice,
    startDate,
    endDate,
    itemImage,
  });
  newAuction.save()
    .then((auction) => res.json(auction))
    .catch((err) => console.log(err));
}

exports.getAllAuctions = function (_, res) {

  //Auction.find({ status: true }).then((auctions) => {
    Auction.find({}).then((auctions) => {
    res.json(auctions)
  }).catch((err) => {
    console.log(err)
  })

}


exports.getAuctionDetails = function (req, res) {
  const email_id = req.body.id;
  Auction.find({ _id: email_id }).then(auction => {
    if (auction) {
      return res.json(auction)
    }
  })
}
exports.getAuctionCount=function(req, res){
  const auctionCount= Auction.countDocuments((count) => count)
     if(!auctionCount) {
      res.status(500).json({success: false})
     }
     res.send({
      auctionCount : auctionCount})
}

exports.updateAuction = async (req, res) => {
  var nic = req.body.nic;

  User.findOneAndUpdate(
    { nic: nic },
    {
      sellerId: req.body.sellerId,
      title: req.body.title,
      desc: req.body.desc,
      basePrice: req.body.basePrice,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      itemImage: req.body.itemImage,
    }
  )
    .then((auction) => {
      if (auction) {
        res.send(auction);
      } else {
        return res.status(404).send({
          message: "Auction not found !",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error in updating the Auction data" + err,
      });
    });
   

};




