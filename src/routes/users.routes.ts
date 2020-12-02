import { Router } from 'express';
import { body } from 'express-validator';

import UsersController from '../controllers/UsersController';
import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username must not be empty'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must have between 4 and 20 characters'),
  ],
  requestValidationMiddleware,
  usersController.signup,
);

usersRouter.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .notEmpty()
      .withMessage('Password must have between 4 and 20 characters'),
  ],
  requestValidationMiddleware,
  usersController.signin,
);

export default usersRouter;
