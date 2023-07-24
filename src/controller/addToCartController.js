const cartModel = require('../model/cartModel');
const userModel = require('../model/userModel');
const productModel = require('./../model/productModel');


const addToCart = async (req, res) => {

    try {
        let userId =  req.userId;
        let productId = req.params.id

        console.log("userId",(userId.toString()),"productId",(productId))
        const userCart = await userModel.findOneAndUpdate({ _id: userId }, {
            $addToSet: { cart: productId }
        })
//   let u=  await userModel.save()
console.log("userCart",userCart)

        if (!userCart) {
            return res.status(404).send({ status: false, message: "user not found" })
        }
        else {
            // await userCart.save();
            return res.status(200).send({ status: true, message: "Add To Cart success.",userCart })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const getCart = async (req, res) => {
    try {
        let userId = req.userId;
        // let totalAmount =1;
// console.log("us",JSON.stringify(userId))
        const userData = await userModel.findOne({ _id: userId }).populate('cart')
// console.log(userData)



        if (!userData) return res.status(404).send({ status: false, message: "user not found." })
        else {
            return res.status(200).send({ status: true, data: userData })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

const removeProduct = async (req, res) => {

    try {
        let userId = req.userId;
        let productId = req.params.productId;

        const userData = await userModel.findOne({ _id: userId })
console.log(userData)
        let updateCart = userData.cart.filter((product) => {

            return product != productId
        })

        userData.cart = updateCart
        await userData.save()

        return res.status(200).send({ status: true, data: updateCart })



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.addToCart = addToCart
module.exports.getCart = getCart
module.exports.removeProduct = removeProduct
