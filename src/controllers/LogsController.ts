import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LogsService from '../services/LogsService';

class LogsController {
  async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { place_id, device_id } = req.params;
    const { value } = req.body;

    const logsService = container.resolve(LogsService);

    const log = await logsService.create({
      value,
      device_id,
      place_id,
      user_id,
    });

    return res.status(201).send(log);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { device_id } = req.params;

    const logsService = container.resolve(LogsService);

    const logs = await logsService.findByDeviceId(device_id);

    return res.send(logs);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const logsService = container.resolve(LogsService);

    const log = await logsService.findById(id);

    return res.send(log);
  }
}

export default LogsController;
