import mongoose, { Schema } from "mongoose";
import SubCategory from '../models/SubCategory.js';

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50,
    },
    subCategories: {
        type: [String],
    },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;