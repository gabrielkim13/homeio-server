import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ILogsService from './interfaces/ILogsService';

import { CreateRequestDTO } from './dtos/LogsServiceDTOs';

import Log from '../models/schemas/Log';

import IPlacesRepository from '../models/repositories/interfaces/IPlacesRepository';
import IDevicesRepository from '../models/repositories/interfaces/IDevicesRepository';
import ILogsRepository from '../models/repositories/interfaces/ILogsRepository';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

@injectable()
class LogsService implements ILogsService {
  constructor(
    @inject('PlacesRepository') private placesRepository: IPlacesRepository,
    @inject('DevicesRepository') private devicesRepository: IDevicesRepository,
    @inject('LogsRepository') private logsRepository: ILogsRepository,
  ) {}

  async create({
    value,
    device_id,
    place_id,
    user_id,
  }: CreateRequestDTO): Promise<Log> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place / device does not belong to you');

    const device = await this.devicesRepository.findById(device_id);

    if (!device) throw new NotFoundError('Device not found');

    const log = await this.logsRepository.create({ device_id, value });

    return classToClass(log);
  }

  async findByDeviceId(device_id: string): Promise<Log[]> {
    const logs = await this.logsRepository.findByDeviceId(device_id);

    return classToClass(logs);
  }

  async findById(id: string): Promise<Log> {
    const log = await this.logsRepository.findById(id);

    if (!log) throw new NotFoundError('Log not found');

    return classToClass(log);
  }
}

export default LogsService;
