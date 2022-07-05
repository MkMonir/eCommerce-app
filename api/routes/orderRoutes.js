import express from 'express';
import { isAdmin, protect } from '../controllers/authController';
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getIncome,
} from './../controllers/orderController';

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/find/:id', getOrder);

router.use(isAdmin);

router.get('/', getOrders);
router.route('/:id').patch(updateOrder).delete(deleteOrder);
router.get('/income', getIncome);

export default router;
