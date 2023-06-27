import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 20,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
        min: 3,
    },
    img: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    quantity: {
        type: Number,
    }
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

export default Product;