import { getRepository, Repository } from 'typeorm';

import IUsersRepository from './interfaces/IUsersRepository';

import User from '../entities/User';

import { CreateUserDTO } from './dtos/UsersRepositoryDTOs';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ username, email, hash, salt }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ username, email, hash, salt });

    await this.ormRepository.save(user);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { username } });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export default UsersRepository;
