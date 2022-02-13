/*const User = require('../models/user')
const { post } = require('../routes')
const router = require('../routes/authRoutes')
const { userSignUp } = require('./AuthController')



router.get("products_by_id", (req, res) => {

    let type = req.query.type
    let productIds = req.query.productIds

    if(type=="array"){

    }

    //we need to find the product information that belongs to product id

    product.find({'_id' : { $in:  productIds}})

    .populate('writer')
    .exec((err, product) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
    

});
*/
// const Product = require('../models/product');

// exports.viewallproducts = async (req,res) =>{

//     const products = await Product.find({}).exec();
//     res.status(200).json({
//         products
//     })
// }
   

    
   

   
    
