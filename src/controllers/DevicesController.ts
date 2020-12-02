import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DevicesService from '../services/DevicesService';

class DevicesController {
  async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { place_id } = req.params;
    const { name, ip, type } = req.body;

    const devicesService = container.resolve(DevicesService);

    const device = await devicesService.create({
      name,
      ip,
      type,
      place_id,
      user_id,
    });

    return res.status(201).send(device);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { place_id } = req.params;

    const devicesService = container.resolve(DevicesService);

    const devices = await devicesService.findByPlaceId(place_id);

    return res.send(devices);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const devicesService = container.resolve(DevicesService);

    const device = await devicesService.findById(id);

    return res.send(device);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id, place_id } = req.params;
    const { name, ip, type } = req.body;

    const devicesService = container.resolve(DevicesService);

    const device = await devicesService.update({
      id,
      name,
      ip,
      type,
      place_id,
      user_id,
    });

    return res.send(device);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id, place_id } = req.params;

    const devicesService = container.resolve(DevicesService);

    await devicesService.delete({
      id,
      place_id,
      user_id,
    });

    return res.send();
  }
}

export default DevicesController;
