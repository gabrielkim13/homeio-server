import Place from '../../entities/Place';

import { CreatePlaceDTO } from '../dtos/PlacesRepositoryDTOs';

interface IPlacesRepository {
  create(data: CreatePlaceDTO): Promise<Place>;
  findById(id: string): Promise<Place | undefined>;
  findByUserId(user_id: string): Promise<Place[]>;
  save(place: Place): Promise<Place>;
  deleteById(id: string): Promise<void>;
}

export default IPlacesRepository;
