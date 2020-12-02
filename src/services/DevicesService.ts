import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IDevicesService from './interfaces/IDevicesService';

import {
  CreateRequestDTO,
  UpdateRequestDTO,
  DeleteRequestDTO,
} from './dtos/DevicesServiceDTOs';

import Device from '../models/entities/Device';

import IPlacesRepository from '../models/repositories/interfaces/IPlacesRepository';
import IDevicesRepository from '../models/repositories/interfaces/IDevicesRepository';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

@injectable()
class DevicesService implements IDevicesService {
  constructor(
    @inject('PlacesRepository') private placesRepository: IPlacesRepository,
    @inject('DevicesRepository') private devicesRepository: IDevicesRepository,
  ) {}

  async create({
    name,
    ip,
    type,
    place_id,
    user_id,
  }: CreateRequestDTO): Promise<Device> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place does not belong to you');

    const placeDevices = await this.devicesRepository.findByPlaceId(place_id);

    const duplicatedDevices = placeDevices.filter(
      device => device.name === name || device.ip === ip,
    );

    if (duplicatedDevices.length > 0)
      throw new BadRequestError('Device is already registered');

    const device = await this.devicesRepository.create({
      name,
      ip,
      type,
      place_id,
    });

    return classToClass(device);
  }

  async findByPlaceId(place_id: string): Promise<Device[]> {
    const devices = await this.devicesRepository.findByPlaceId(place_id);

    return classToClass(devices);
  }

  async findById(id: string): Promise<Device> {
    const device = await this.devicesRepository.findById(id);

    if (!device) throw new NotFoundError('Device not found');

    return classToClass(device);
  }

  async update({
    id,
    name,
    ip,
    type,
    place_id,
    user_id,
  }: UpdateRequestDTO): Promise<Device> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place / device does not belong to you');

    const device = await this.devicesRepository.findById(id);

    if (!device) throw new NotFoundError('Device not found');

    Object.assign(place, { name, ip, type });

    const updatedDevice = await this.devicesRepository.save(device);

    return classToClass(updatedDevice);
  }

  async delete({ id, place_id, user_id }: DeleteRequestDTO): Promise<void> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place / device does not belong to you');

    const device = await this.devicesRepository.findById(id);

    if (!device) throw new NotFoundError('Device not found');

    await this.devicesRepository.deleteById(id);
  }
}

export default DevicesService;
