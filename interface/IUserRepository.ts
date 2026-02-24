import { CreateUserPayLoad, UserInfo } from "../type/type";

export interface IUserRepository {
  getByEmail(email: string): Promise<UserInfo>;
  createUser(payload: CreateUserPayLoad): Promise<boolean>;
  exists(email: string): Promise<boolean>;
}