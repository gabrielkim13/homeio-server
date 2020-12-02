import User from '../../models/entities/User';

export interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface SigninRequestDTO {
  email: string;
  password: string;
}

export interface ResponseDTO {
  user: User;
  token: string;
}
