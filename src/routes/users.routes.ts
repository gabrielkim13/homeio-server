import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/signup', usersController.signup);
usersRouter.post('/signin', usersController.signin);

export default usersRouter;
