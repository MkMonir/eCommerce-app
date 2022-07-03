import multer from 'multer';
import sharp from 'sharp';
import User from '../models/userModel';
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';
import { createOne, updateOne, deleteOne, getOne, getAll } from './handlerFactory';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images!', 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//////////// Users Route handlers

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) note: Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password update. Please use /updateMyPassword.', 400)
    );
  }

  // 3) note: Filterd out unwanted fields name that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) note: Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

//// create User
export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! please use /signUp insted',
  });
};

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//// Get Users
export const getAllUsers = getAll(User);

//// Get User
export const getUserById = getOne(User);

//// Update User
export const updateUser = updateOne(User);

//// Delete user
export const deleteUser = deleteOne(User);

export const usersStat = catchAsync(async (req, res, next) => {
  const today = new Date();
  const lastYear = today.getFullYear(today.getFullYear() - 1);

  const data = await User.aggregate([
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data,
  });
});
