import express from 'express';
import { getSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory } from '../controllers/subcategoryController.js';

const router = express.Router();

router.get('/', getSubCategories);
router.get('/:id', getSubCategoryById);
router.post('/:categoryId', createSubCategory);
router.put('/:id/:categoryId', updateSubCategory);
router.delete('/:id/:categoryId', deleteSubCategory);




export default router;