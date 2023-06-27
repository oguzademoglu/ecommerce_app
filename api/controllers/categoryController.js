import Category from '../models/Category.js';


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category has been deleted!");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createCategory = async (req, res) => {
    const newCategory = new Category({
        title: req.body.title,
        subCategories: req.body.subCategories,
    });
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

