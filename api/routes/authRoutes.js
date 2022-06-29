import express from 'express';
import { login, protect, register, updateMyPassword } from './../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// note: PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(protect);

router.route('/updateMyPassword').patch(updateMyPassword);

export default router;
