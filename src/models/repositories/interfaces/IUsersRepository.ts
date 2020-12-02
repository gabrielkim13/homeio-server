import User from '../../entities/User';

import { CreateUserDTO } from '../dtos/UsersRepositoryDTOs';

interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default IUsersRepository;
