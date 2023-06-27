import mongoose, { Schema } from "mongoose";


const subCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50,
    },
    category: {
        type: String,
    },
    products: {
        // type: Array,
        type: [String],
    },
}, { timestamps: true });

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;