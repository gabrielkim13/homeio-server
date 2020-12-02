import {
  CreateRequestDTO,
  DeleteRequestDTO,
  UpdateRequestDTO,
} from '../dtos/PlacesServiceDTOs';

import Place from '../../models/entities/Place';

interface IPlacesService {
  create(data: CreateRequestDTO): Promise<Place>;
  findByUserId(user_id: string): Promise<Place[]>;
  findById(id: string): Promise<Place>;
  update(data: UpdateRequestDTO): Promise<Place>;
  delete(data: DeleteRequestDTO): Promise<void>;
}

export default IPlacesService;
