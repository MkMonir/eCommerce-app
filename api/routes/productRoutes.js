import express from 'express';
import { isAdmin, protect } from '../controllers/authController';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from './../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router.get('/find/:id', getProduct);
router.route('/:id').patch(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct);

export default router;
