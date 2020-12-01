import { Request, Response } from 'express';

class PlacesController {
  public create(req: Request, res: Response): Response {
    return res.status(201).send();
  }

  public index(req: Request, res: Response): Response {
    return res.send();
  }

  public show(req: Request, res: Response): Response {
    return res.send();
  }

  public update(req: Request, res: Response): Response {
    return res.send();
  }

  public delete(req: Request, res: Response): Response {
    return res.send();
  }
}

export default PlacesController;
