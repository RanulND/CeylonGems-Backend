const Bid = require('../models/bid');
const Auction = require("../models/auction");
const { successResponse, errorResponse } = require('../shared/responses');

exports.bidAdd = function (req, res) {

    const { auctionId, bidValue, buyerId } = req.body;
  
    const newBid = new Bid({
        auctionId, 
        bidValue, 
        buyerId
    });
    newBid.save()
      .then((bid) =>{
        successResponse(res, "Bid added successfully", bid)
    }).catch(err => {
        errorResponse(res, null, null,err)
    })
      
 }

 exports.getAllBidsByAuctionId = function (req, res) {
    const id = req.body.id;
    Bid.find({ auctionId: id }).then(bid => {
        if (bid) {
          return res.json(bid)
        }
      }).catch(err =>{
      
        return errorResponse(res, 400, "Something went wrong.", null);
      });
    }


exports.setWinningBid = async (req, res, next) => {
    const id = req.body.id;
    try{
        let bid = await Bid.find({ auctionId: id }, 'bidValue -_id').sort({"bidValue":-1}).limit(1).exec()
 
        if (bid) {
     
        return res.json(bid)
       
        }
      }catch(err){
      
        return errorResponse(res, 400, "Something went wrong.", null);
      }

    }
  

    exports.getAllBidsByBuyer = function (req, res) {
      const id = req.body.id;
      Bid.find({ buyerId: id }).then(bid => {
          if (bid) {
            return res.json(bid)
          }
        }).catch(err =>{
        
          return errorResponse(res, 400, "Something went wrong.", null);
        });
      }
  


