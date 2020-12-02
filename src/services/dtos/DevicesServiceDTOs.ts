import { DeviceTypes } from '../../models/entities/Device';

export interface CreateRequestDTO {
  name: string;
  ip: string;
  type: DeviceTypes;
  place_id: string;
  user_id: string;
}

export interface UpdateRequestDTO {
  id: string;
  name: string;
  ip: string;
  type: DeviceTypes;
  place_id: string;
  user_id: string;
}

export interface DeleteRequestDTO {
  id: string;
  place_id: string;
  user_id: string;
}
