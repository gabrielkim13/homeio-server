import { Request, Response } from 'express';

class UsersController {
  public signin(req: Request, res: Response): Response {
    return res.send();
  }

  public signup(req: Request, res: Response): Response {
    return res.send();
  }
}

export default UsersController;
