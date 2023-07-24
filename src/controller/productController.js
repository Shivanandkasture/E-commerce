const productModel = require('./../model/productModel');
const path = require('path')
let result
var mongoose = require('mongoose');

const createProduct = async (req, res) => {
    try {
        let data = req.body
        
        const { title, brand, productName, description, price, rating, category, processor, imageUrl } = data

      
        let productData = await productModel.create(data)
  
        return res.status(201).send({ status: true, data: productData })

    } catch (error) {
        return res.status(500).send({ status: false, messaage: error.messaage })

    }
}

const getAllProducts = async (req, res) => {

    try {

        let products = await productModel.find({});

        return res.status(200).send({ status: true, data: products })

    } catch (error) {

    }
}

let getProductById = async (req, res) => {
    try {
        let productId = req.params.id

        console.log(productId)
        //---------[Validations]
        // if (!validators.isValidObjectId(productId)) return res.status(400).send({ status: false, message: 'Invalid productId Format' })

        //---------[Checking productId is Present in Db or not]

        //   console.log( mongoose.Types.ObjectId.isValid(productId));

        let isProductExist = await productModel.findOne({ _id: productId })
        // console.log("isProductExist",isProductExist)
        if (!isProductExist) return res.status(404).send({ status: false, message: "Product Not Found" });

        //---------[Send Response]
        // console.log(result)

        return res.status(200).send({ status: true, message: 'Success', data: isProductExist })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createProduct = createProduct
module.exports.getAllProducts = getAllProducts
module.exports.getProductById = getProductById