const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId  

const cartSchema = mongoose.Schema(
  {
    userId: { type: ObjectId, requierd: true, unique: true, ref: "User"  },
    productId:{type:ObjectId, ref:'Products'},
    items:{type:Object}

  }, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema);