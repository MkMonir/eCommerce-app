import express, { application } from 'express';
import { isAdmin, protect } from '../controllers/authController';
import {
  // createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getIncome,
  // checkoutSession,
  // stripeWebhook,
} from './../controllers/orderController';

const router = express.Router();

// router.post('/create-checkout-session', checkoutSession);
// router.post('/webhook', stripeWebhook);
router.use(protect);

// router.post('/', createOrder);
router.get('/find/:id', getOrder);

router.use(isAdmin);

router.get('/', getOrders);
router.route('/:id').patch(updateOrder).delete(deleteOrder);
router.get('/income', getIncome);

export default router;
