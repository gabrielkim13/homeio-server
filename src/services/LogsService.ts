import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ILogsService from './interfaces/ILogsService';

import {
  CreateFromNoderedRequestDTO,
  CreateRequestDTO,
} from './dtos/LogsServiceDTOs';

import Log from '../models/schemas/Log';

import IPlacesRepository from '../models/repositories/interfaces/IPlacesRepository';
import IDevicesRepository from '../models/repositories/interfaces/IDevicesRepository';
import ILogsRepository from '../models/repositories/interfaces/ILogsRepository';
import IHTTPClientProvider from '../providers/interfaces/IHTTPClientProvider';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { DeviceTypes } from '../models/entities/Device';

@injectable()
class LogsService implements ILogsService {
  constructor(
    @inject('PlacesRepository') private placesRepository: IPlacesRepository,
    @inject('DevicesRepository') private devicesRepository: IDevicesRepository,
    @inject('LogsRepository') private logsRepository: ILogsRepository,
    @inject('HTTPClientProvider') private httpClient: IHTTPClientProvider,
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

    const hubPort = process.env.NODERED_PORT || '1880';
    const hubUrl = `http://${place.hub_ip}:${hubPort}/logs`;

    console.log('Device type: ', Number(device.type) === DeviceTypes.LightBulb);

    switch (Number(device.type)) {
      case DeviceTypes.LightBulb:
        console.log(hubUrl);
        console.log({
          ip: device.ip,
          type: device.type.toString(),
          value: (value.status as boolean) ? 'on' : 'off',
        });

        await this.httpClient.post(hubUrl, {
          ip: device.ip,
          type: device.type.toString(),
          value: (value.status as boolean) ? 'on' : 'off',
        });

        break;

      default:
        break;
    }

    const log = await this.logsRepository.create({ device_id, value });

    return classToClass(log);
  }

  async createFromNodered({
    ip,
    type,
    value,
  }: CreateFromNoderedRequestDTO): Promise<Log> {
    const device = await this.devicesRepository.findByIp(ip);

    if (!device) throw new NotFoundError('Device not found');

    const deviceSpecificValue = {};

    switch (Number(type)) {
      case DeviceTypes.LightSensor:
        Object.assign(deviceSpecificValue, { luminosity: value });

        break;

      default:
        throw new BadRequestError('Device not supported for this operation');
    }

    const log = await this.logsRepository.create({
      device_id: device.id,
      value: deviceSpecificValue,
    });

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
