import Device from '../../entities/Device';

import { CreateDeviceDTO } from '../dtos/DevicesRepositoryDTOs';

interface IDevicesRepository {
  create(data: CreateDeviceDTO): Promise<Device>;
  findById(id: string): Promise<Device | undefined>;
  findByIp(ip: string): Promise<Device | undefined>;
  findByPlaceId(place_id: string): Promise<Device[]>;
  save(device: Device): Promise<Device>;
  deleteById(id: string): Promise<void>;
}

export default IDevicesRepository;
