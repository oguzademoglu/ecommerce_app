import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';

export const getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateSubCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findById(categoryId);
        if (req.body.category && category._id !== req.body.category) {
            try {
                await Category.findByIdAndUpdate(req.body.category, {
                    $push: {subCategories: req.params.id},
                });
            } catch (error) {
                next(error);
            }
            try {
                await Category.findByIdAndUpdate(categoryId, {
                    $pull: {subCategories: req.params.id},
                });
            } catch (error) {
                next(error);
            }
        }
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            category: req.body.category || category._id,
        });
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const deleteSubCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        try {
            await Category.findByIdAndUpdate(categoryId, {
                $pull: {subCategories: req.params.id},
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json("SubCategory has been deleted!");
        
    } catch (error) {
        next(error);
    }
}

export const createSubCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const newSubCategory = new SubCategory({
        title: req.body.title,
        category: categoryId,
    });
    try {
        const savedSubCategory = await newSubCategory.save();
        try {
            await Category.findByIdAndUpdate(categoryId, {
                $push: {subCategories: savedSubCategory._id},
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedSubCategory);
    } catch (error) {
        next(error);
    }
}
