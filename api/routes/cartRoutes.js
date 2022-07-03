import express from 'express';
import { isAdmin, protect } from '../controllers/authController';
import {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
} from './../controllers/CartController';

const router = express.Router();

router.use(protect);

router.post('/', createCart);
router.route('/:id').patch(updateCart).delete(deleteCart);

router.use(isAdmin);

router.get('/', getCarts);

export default router;
