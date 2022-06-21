const Payment = require("../models/payment");
const { ackResponse, errorResponse, successResponse } = require("../shared/responses");
const Gem = require('../models/gem')
const Jewellery = require('../models/jewellery')
const bcrypt = require("bcrypt")
const sendEmail = require("../shared/sendEmail");
const crypto = require("crypto");
// const Stripe = require("stripe");
const orderController = require('../controllers/OrderController');
const { getEnvironmentData } = require("worker_threads");
const Order = require("../models/order");

// This is your test secret API key.
const stripe = require("stripe")('sk_test_51L9jjXSFjlJf2mnzONzkZPXYeWBlL87WTc5XqU0avbxQiYYoqPvYu7895mHhvtlaiAbQ8XwCMLpGPzFHwe6wg7OG00pBgUMWVv');

// const storeItems = new Map([
//   [1, { price: 10000, name: "Blue sapphires" }],
//   [2, { price: 20000, name: "Synthetic Emerald" }],
// ])



 

const storeItems = async(id, next) => {
   let name;
   let price;
    try{
    const details = await Gem.findById(id);
      if (details) {
       console.log(details);
       name=details.title;
       price=10000
      } else {
        Jewellery.findById(id).then((details) => {
          if (details) {
            console.log(details);
          }
          else {
            return ({
              message: "Product not found !",
            });
          }
        })
      }
    }catch (err){
        console.log(err)
    }
    return({name,price})
  }
  
  
     

// exports.payment =  async (req, res, next) => {
  
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map(item => {
       
//     const storeItem = getData(item.product);
//     console.log("2"+ storeItem);
//       // storeItems(item.product).then(data => {
//       //     console.log(data);
//       //     price = data;
//       //     console.log(data.name, data.price);
//       //     getData(data.name, data.price);
//       // }).catch(err => {
//       //     console.log(err);
//       // });
      
      
//         return {
//           price_data: {
//             currency: "LKR",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.price * 100,
//           },
//           quantity: item.quantity,
//         }
//       }),
      
//       success_url: "http://localhost:3000/payment",
//       cancel_url: "http://localhost:3000/paymenterror"
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// };




// exports.payment =  async (req, res, next) => {
  
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items:req.body.items.map(async item => {
        
       
//         const storeItem = await storeItems(item.product);
//         console.log(storeItem);
//         console.log("Let's see");
//         console.log(storeItem.name);
//         console.log(storeItem.price);
    
//       return {
//         price_data: {
//           currency: "LKR",
//           product_data: {
//             name: storeItem.name,
//           },
//           unit_amount: storeItem.price * 100,
//         },
//         quantity: item.quantity,
//       } 
//       }),
      
//       success_url: "http://localhost:3000/payment",
//       cancel_url: "http://localhost:3000/paymenterror"
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// };

// const productData = async (items,next) => {
//   let products = [];
//   items.map(async item => {
//    const storeItem = await storeItems(item.product)
//     console.log(storeItem);
//       console.log("Let's see");
//       console.log(storeItem.name);
//       console.log(storeItem.price);
//       let itemsData = {
//         id: item.product,
//         name:storeItem.name,
//         price:storeItem.price ,
       
//        }
//        console.log("Hehe: " + itemsData)
//        products.push(itemsData);
//   })
//   console.log("Bingo: " + products)
//   return products;
// }



exports.payment =  async (req, res, next) => {
// const getData = await productData(req.body.items)
// console.log("Hello: " + getData)
 const total = req.body.amount;
 const id = req.body.id;
 console.log(total,id)
try {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
  //   line_items:req.body.items.map(async item => {
    
  //     const storeItem = await storeItems(item.product)
  //     console.log(storeItem);
  //       console.log("Let's see");
  //       console.log(storeItem.name);
  //       console.log(storeItem.price);
    
  //     return {
  //       price_data: {
  //         currency: "LKR",
  //         product_data: {
  //           name: storeItem.name,
  //         },
  //         unit_amount: storeItem.price,
  //       },
  //       quantity: item.quantity,
  //     }
    
  // }),
  line_items: [
    {
      price_data: {
                currency: "LKR",
                product_data: {
                            name: "Total",
                          },
                unit_amount: total * 100,
              },
              quantity:1,
            
            
    },
  ],
    success_url: `http://localhost:3000/ceylon-ruby/buyer/payment/${id}`,
    cancel_url: `http://localhost:3000/ceylon-ruby/buyer/paymenterror/${id}`
  })
  res.json({ url: session.url })
} catch (e) {
  res.status(500).json({ error: e.message })
}

};




//mobile
exports.paymentStripe =  async (req, res, next) => {
  try {
    // Getting data from client
    let { amount, name } = req.body;
    // Simple validation
    if (!amount || !name)
      return res.status(400).json({ message: "All fields are required" });
    amount = parseInt(amount);
    // Initiate payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "LKR",
      payment_method_types: ["card"],
      metadata: { name },
    });
    // Extracting the client secret 
    const clientSecret = paymentIntent.client_secret;
    // Sending the client secret as response
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    // Catch any error and send error 500 to client
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


//send Payment Verification Email
exports.paymentEmail =  async (req, res, next) => {
  var email = req.body.email;
  var id = req.body.orderId;
  var amount = req.body.amount;
  try {
    

    //set values in payment model
    const payment = new Payment({
      orderId: id,
      amount: amount,
      isSuccess: true,
    
    });
    await payment.save();

    // Create verification url to email for provided email
    const paymentVerifyEmailUrl = `http://localhost:3000/ceylon-ruby/buyer/paymentreceipt/${id}`;

    // HTML Message
    const message = `
        <h1>Payment Success</h1>
        <p>To verify your payment, please use the payment verification link below to get the payment receipt:</p>
        <a href=${paymentVerifyEmailUrl} clicktracking=off>${paymentVerifyEmailUrl}</a>`;

    try {
      await sendEmail({
        to: email,
        subject: "CeylonRuby - Payment Verification",
        text: message,
      });

      Order.findOneAndUpdate(
        {_id: id },
        {
          BuyerPaymentSuccess:true
        }
      ).then(order => {
        res.send(order)
      }).catch(err => {
        errorResponse(res, null, null, err)
      })
    

      return successResponse(res,
        "Payment Verification Email Sent.Thank you for the payment. Please check your email to get the payment Receipt",
        null);

    } catch (err) {
      console.log(err);


      await Payment.save();
      return errorResponse(res, 400, "Payment Verification Email could not be sent", null);
    }
  } catch (err) {
    return errorResponse(res, 400, "Something went wrong", null);
  }
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