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
  const email_id = req.body.id;
  Auction.find({ email: email_id }).then(auction => {
    if (auction) {
      return res.json(auction)
    }
  })
}

exports.getAuctionsByDate = (req, res) => {
  const weekAgoDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  const aggregatorOpts = [
      {
          $match: {
              'createdAt': { $gte: weekAgoDate, $lt: new Date() }
          }
      },
      {
          $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: "$createdAt" } },
              count: { $sum: 1 }
          }
      },
  ]

  Auction.aggregate(aggregatorOpts).then(result => {
      const dateArr = new Array(10)
          .fill(0)
          .map((_, i) => new Date(Date.now() - (i) * 24 * 60 * 60 * 1000))
          .map(e => {
              const date = e.toISOString().split('T')[0];
              const obj = result.find(f => f._id === date);
              if (obj) {
                  return obj
              }

              return { _id: date, count: 0 };
          })
          
      return successResponse(res, "Orders retrived by date successfully", dateArr.reverse())
  }).catch(err => {
      return errorResponse(res, null, null, err)
  })
}