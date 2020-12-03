import { getRepository, Repository } from 'typeorm';

import IDevicesRepository from './interfaces/IDevicesRepository';

import Device from '../entities/Device';

import { CreateDeviceDTO } from './dtos/DevicesRepositoryDTOs';

class DevicesRepository implements IDevicesRepository {
  private ormRepository: Repository<Device>;

  constructor() {
    this.ormRepository = getRepository(Device);
  }

  async create({ name, ip, type, place_id }: CreateDeviceDTO): Promise<Device> {
    const device = this.ormRepository.create({
      name,
      ip,
      type,
      place: { id: place_id },
    });

    await this.ormRepository.save(device);

    return device;
  }

  async findById(id: string): Promise<Device | undefined> {
    const device = await this.ormRepository.findOne(id);

    return device;
  }

  async findByIp(ip: string): Promise<Device | undefined> {
    const device = await this.ormRepository.findOne({ ip });

    return device;
  }

  async findByPlaceId(place_id: string): Promise<Device[]> {
    const devices = await this.ormRepository.find({ place: { id: place_id } });

    return devices;
  }

  async save(device: Device): Promise<Device> {
    const updatedDevice = await this.ormRepository.save(device);

    return updatedDevice;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default DevicesRepository;
