import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';

import IUsersService from './interfaces/IUsersService';

import {
  SignupRequestDTO,
  SigninRequestDTO,
  ResponseDTO,
} from './dtos/UsersServiceDTOs';

import auth from '../config/auth';

import IUsersRepository from '../models/repositories/interfaces/IUsersRepository';
import ICryptoProvider from '../providers/interfaces/ICryptoProvider';

import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';

@injectable()
class UsersService implements IUsersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('CryptoProvider') private cryptoProvider: ICryptoProvider,
  ) {}

  async signup({
    username,
    email,
    password,
  }: SignupRequestDTO): Promise<ResponseDTO> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new BadRequestError('Email is already in use');

    const { hash, salt } = this.cryptoProvider.encrypt(password);

    const user = await this.usersRepository.create({
      username,
      email,
      hash,
      salt,
    });

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user: classToClass(user), token };
  }

  async signin({ email, password }: SigninRequestDTO): Promise<ResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('Invalid credentials');

    const isPasswordMatch = this.cryptoProvider.verify(
      password,
      user.hash,
      user.salt,
    );

    if (!isPasswordMatch) throw new UnauthorizedError('Invalid credentials');

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user: classToClass(user), token };
  }
}

export default UsersService;
