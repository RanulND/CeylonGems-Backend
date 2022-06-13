const Payment = require("../models/payment");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");
const Gem = require('../models/gem')
const Jewellery = require('../models/jewellery')

const orderController = require('../controllers/OrderController');

// This is your test secret API key.
const stripe = require("stripe")('sk_test_51L9jjXSFjlJf2mnzONzkZPXYeWBlL87WTc5XqU0avbxQiYYoqPvYu7895mHhvtlaiAbQ8XwCMLpGPzFHwe6wg7OG00pBgUMWVv');

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Blue sapphires" }],
  [2, { priceInCents: 20000, name: "Synthetic Emerald" }],
])
 // const {storeItem} = storeItems(item.product);
        // console.log("hi")
        // console.log(storeItem)
        // console.log(storeItem)
// function setItems (name1,price1)  {
// const name=name1;
// const price=price1;
//   return {name,price}
// }

// function storeItems (id)  {
//     Gem.findById(id).then((details) => {
//       if (details) {
//         console.log("bye")
//         console.log(details)
//         let name=details.title;
//         let price=details.base_value;
//         setItems(name,price);
//       } else {
//         Jewellery.findById(id).then((details) => {
//           if (details) {
//             console.log(details)
//             let name=details.title;
//               let price=details.price;
//               setItems(name,price);
//           }
//           else {
//             return ({
//               message: "Product not found !",
//             })
//           }
//         })
//       }
     
//     }).catch((err) => {
//         return ({
//           message: "Error in finding the Product data " + err,
//         });
//       });
//     // const res = orderController.getProductDetails
//     // console.log(res)
//   }

exports.payment =  async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      
      success_url: "http://localhost:3000/paymentreceipt",
      cancel_url: "http://localhost:3000/payment"
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
};


exports.paymentget =  async (req, res, next) => {
 console.log("GET Response from Researcher")
 res.json({ 
   message: 'It Works'
  })
};

// exports.paymentAdd = function (req, res) {

//   var orderId = req.body.order_id;
//   var paymentId = req.body.payment_id;
//   var amount = req.body.payhere_amount;
//   var currency = req.body.payhere_currency;
//   var method = req.body.method;
//   var statusMessage = req.body.status_message;
  
 
//   var status = req.body.status_code;
//   var merchantId = req.body.merchant_id;
//   var md5sig = req.body.md5sig;

//   var merchant_secret='############';
//   var local_md5sig;

//   local_md5sig = strtoupper(
//     md5 (
//         merchantId + 
//         orderId + 
//         amount + 
//         currency + 
//         status + 
//         strtoupper(md5(merchant_secret)) 
//     ) 
// )

// if ((local_md5sig === md5sig) & (status == 2) ){
//     const newPayment = new Payment({
//         orderId,
//         paymentId,
//         amount,
//         currency,
//         method,
//         statusMessage,
        
//     });

//     newPayment.save()
//       .then((payment) => res.json(payment))
//       .catch(err => {
//         return errorResponse(res, 400, "Something went wrong.", null);
//       });
// }else{
//     return errorResponse(res, 400, "Payment Verification Failed", null);
// } }