import express from 'express';
import { getUser, getUserById, updateUser, deleteUser, createUser } from '../controllers/userController.js'
import { verifyAdmin, verifyUser } from '../utils/verification.js';

const router = express.Router();

router.get('/', verifyUser, getUser);
router.get('/:id', verifyAdmin ,getUserById);
router.put('/:id', verifyAdmin, updateUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.post('/', verifyAdmin, createUser);

export default router;