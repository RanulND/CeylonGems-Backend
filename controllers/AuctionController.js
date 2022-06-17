const Auction = require("../models/auction");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");

exports.auctionAdd = function (req, res) {

  const { sellerId, title, desc, curPrice, duration, itemImage } = req.body;

  const newAuction = new Auction({
    sellerId,
    title,
    desc,
    curPrice,
    duration,
    itemImage,
  });
  newAuction.save()
    .then((auction) => res.json(auction))
    .catch((err) => console.log(err));
}

exports.getAllAuctions = function (req, res) {

  Auction.find({ status: true }).then((auctions) => {
    res.json(auctions)
  }).catch((err) => {
    console.log(err)
  })

}


exports.getAuctionDetails = function (req, res) {
  const id = req.body.id;
  Auction.find({ _id: id }).then(auction => {
    if (auction) {
      return res.json(auction)
    }
  })
}

