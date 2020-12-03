import { DeviceTypes } from '../../models/entities/Device';

export interface CreateRequestDTO {
  value: Record<string, unknown>;
  device_id: string;
  place_id: string;
  user_id: string;
}

export interface CreateFromNoderedRequestDTO {
  ip: string;
  type: DeviceTypes;
  value: Record<string, unknown>;
}
