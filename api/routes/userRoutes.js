import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resizeUserPhoto,
  uploadUserPhoto,
  getMe,
  updateMe,
  deleteMe,
  usersStat,
} from './../controllers/userController';
import { protect, isAdmin } from './../controllers/authController';

const router = express.Router();

// note: PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(protect);

router.route('/me').get(getMe, getUserById);
router.route('/updateMe').patch(uploadUserPhoto, resizeUserPhoto, updateMe);
router.route('/deleteMe').delete(deleteMe);

// note: RESTRICT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(isAdmin);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').patch(updateUser).delete(deleteUser);

router.get('/find/:id', getUserById);

router.get('/stat', usersStat);

export default router;
