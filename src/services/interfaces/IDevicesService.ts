import {
  CreateRequestDTO,
  DeleteRequestDTO,
  UpdateRequestDTO,
} from '../dtos/DevicesServiceDTOs';

import Device from '../../models/entities/Device';

interface IDevicesService {
  create(data: CreateRequestDTO): Promise<Device>;
  findByPlaceId(place_id: string): Promise<Device[]>;
  findById(id: string): Promise<Device>;
  update(data: UpdateRequestDTO): Promise<Device>;
  delete(data: DeleteRequestDTO): Promise<void>;
}

export default IDevicesService;
