import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersService from '../services/UsersService';

class UsersController {
  async signup(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.signup({ username, email, password });

    return res.status(201).send(user);
  }

  async signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.signin({ email, password });

    return res.send(user);
  }
}

export default UsersController;
