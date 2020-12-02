import { getRepository, Repository } from 'typeorm';

import IPlacesRepository from './interfaces/IPlacesRepository';

import Place from '../entities/Place';

import { CreatePlaceDTO } from './dtos/PlacesRepositoryDTOs';

class PlacesRepository implements IPlacesRepository {
  private ormRepository: Repository<Place>;

  constructor() {
    this.ormRepository = getRepository(Place);
  }

  async create({ name, hub_ip, user_id }: CreatePlaceDTO): Promise<Place> {
    const place = this.ormRepository.create({
      name,
      hub_ip,
      user: { id: user_id },
    });

    await this.ormRepository.save(place);

    return place;
  }

  async findById(id: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne(id);

    return place;
  }

  async findByUserId(user_id: string): Promise<Place[]> {
    const place = await this.ormRepository.find({ user: { id: user_id } });

    return place;
  }

  async save(place: Place): Promise<Place> {
    const updatedPlace = await this.ormRepository.save(place);

    return updatedPlace;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PlacesRepository;
