export interface CreateRequestDTO {
  name: string;
  hub_ip: string;
  user_id: string;
}

export interface UpdateRequestDTO {
  id: string;
  name: string;
  hub_ip: string;
  user_id: string;
}

export interface DeleteRequestDTO {
  id: string;
  user_id: string;
}
