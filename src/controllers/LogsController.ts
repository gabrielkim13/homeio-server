import { Request, Response } from 'express';

class LogsController {
  public create(req: Request, res: Response): Response {
    return res.status(201).send();
  }

  public index(req: Request, res: Response): Response {
    return res.send();
  }

  public show(req: Request, res: Response): Response {
    return res.send();
  }
}

export default LogsController;
