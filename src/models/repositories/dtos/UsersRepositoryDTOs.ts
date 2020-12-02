export interface CreateUserDTO {
  username: string;
  email: string;
  hash: string;
  salt: string;
}
