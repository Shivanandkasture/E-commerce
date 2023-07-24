const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        title: { type: String },
        brand: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        rating: { type: String },
        category: { type: String },
        processor: { type: String },
        image: { type: String },
        deletedAt: { type: Date },
        isDeleted: { type: Boolean, default: false },

    }, { timestamps: true })

module.exports = mongoose.model("Products", productSchema)