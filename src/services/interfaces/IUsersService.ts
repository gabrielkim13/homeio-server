import {
  ResponseDTO,
  SigninRequestDTO,
  SignupRequestDTO,
} from '../dtos/UsersServiceDTOs';

interface IUsersService {
  signup(data: SignupRequestDTO): Promise<ResponseDTO>;
  signin(data: SigninRequestDTO): Promise<ResponseDTO>;
}

export default IUsersService;
