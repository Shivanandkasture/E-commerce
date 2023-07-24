const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String},
    email: { type: String},
    cart:[{type:mongoose.Schema.Types.ObjectId, ref:'Products'},{totalAmount:Number}],
    phone: { type: String, required: true, trim: true, unique: true },
    password: { type: String },

}, { timestamps: true })

module.exports =  mongoose.model('User', userSchema)