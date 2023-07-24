const express = require("express");
const router = express.Router();

const { userRegister } = require('./../controller/auth/registerController')
const { createProduct, getAllProducts, getProductById } = require('./../controller/productController')
const { loginController } = require('./../controller/auth/loginController')
const { upload } = require('./../middleware/uploadImage')
const { addToCart, getCart, removeProduct } = require('../controller/addToCartController')
const { authentication } = require('../middleware/auth')

router.post('/register', userRegister)
router.post('/login', loginController)

router.post('/createproduct',  createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.post('/addToCart/:id', authentication,  addToCart)
router.get('/getCart',authentication,   getCart)
router.delete('/removeProduct/:productId', authentication, removeProduct)

module.exports = router