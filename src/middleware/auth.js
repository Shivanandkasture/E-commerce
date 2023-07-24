// =================================[ imports ]==========================================>>

const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const cookies = require('cookie-parser')


// <<========================[ Authentication Middleware ]===========================>>

const authentication = async function (req, res, next) {

    try {
        // console.log(req.headers["x-api-key"])
        if (!req.headers["x-api-key"]) return res.status(400).send({ status: false, message: 'Header is missing' });
        const authheader = req.headers["x-api-key"]
        const token = authheader
        // console.log(token)

        if (!token)
            return res.status(400).send({ status: false, msg: "request is missing a mandatory token." });

        const verifyToken = jwt.verify(token, "projectGroup06");
        const user = await userModel.findOne({ _id: verifyToken.userId });

        if (!user) return res.status(404).send({ status: false, message: "user not found." });
        // console.log(user._id)
        req.token = token;
        req.user = user;
        req.userId = user._id;
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
};

// <<========================[ Exports ]===========================>>

module.exports.authentication = authentication;
