import { DeviceTypes } from '../../entities/Device';

export interface CreateDeviceDTO {
  name: string;
  ip: string;
  type: DeviceTypes;
  place_id: string;
}
