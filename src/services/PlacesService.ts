import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IPlacesService from './interfaces/IPlacesService';

import {
  CreateRequestDTO,
  UpdateRequestDTO,
  DeleteRequestDTO,
} from './dtos/PlacesServiceDTOs';

import Place from '../models/entities/Place';

import IUsersRepository from '../models/repositories/interfaces/IUsersRepository';
import IPlacesRepository from '../models/repositories/interfaces/IPlacesRepository';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

@injectable()
class PlacesService implements IPlacesService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('PlacesRepository') private placesRepository: IPlacesRepository,
  ) {}

  async create({ name, hub_ip, user_id }: CreateRequestDTO): Promise<Place> {
    const userPlaces = await this.placesRepository.findByUserId(user_id);

    const duplicatedPlaces = userPlaces.filter(
      place => place.name === name || place.hub_ip === hub_ip,
    );

    if (duplicatedPlaces.length > 0)
      throw new BadRequestError('Place is already registered');

    const place = await this.placesRepository.create({ name, hub_ip, user_id });

    return classToClass(place);
  }

  async findByUserId(user_id: string): Promise<Place[]> {
    const places = await this.placesRepository.findByUserId(user_id);

    return classToClass(places);
  }

  async findById(id: string): Promise<Place> {
    const place = await this.placesRepository.findById(id);

    if (!place) throw new NotFoundError('Place not found');

    return classToClass(place);
  }

  async update({
    id,
    name,
    hub_ip,
    user_id,
  }: UpdateRequestDTO): Promise<Place> {
    const place = await this.placesRepository.findById(id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place does not belong to you');

    Object.assign(place, { name, hub_ip });

    const updatedPlace = await this.placesRepository.save(place);

    return classToClass(updatedPlace);
  }

  async delete({ id, user_id }: DeleteRequestDTO): Promise<void> {
    const place = await this.placesRepository.findById(id);

    if (!place) throw new NotFoundError('Place not found');

    if (place.user_id !== user_id)
      throw new UnauthorizedError('Place does not belong to you');

    await this.placesRepository.deleteById(id);
  }
}

export default PlacesService;
