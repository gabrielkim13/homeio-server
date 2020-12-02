import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PlacesService from '../services/PlacesService';

class PlacesController {
  async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, hub_ip } = req.body;

    const placesService = container.resolve(PlacesService);

    const place = await placesService.create({ name, hub_ip, user_id });

    return res.status(201).send(place);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const placesService = container.resolve(PlacesService);

    const places = await placesService.findByUserId(user_id);

    return res.send(places);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const placesService = container.resolve(PlacesService);

    const place = await placesService.findById(id);

    return res.send(place);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;
    const { name, hub_ip } = req.body;

    const placesService = container.resolve(PlacesService);

    const place = await placesService.update({ id, name, hub_ip, user_id });

    return res.send(place);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;

    const placesService = container.resolve(PlacesService);

    await placesService.delete({ id, user_id });

    return res.send();
  }
}

export default PlacesController;
