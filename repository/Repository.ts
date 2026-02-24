import { IUserRepository } from "../interface/IUserRepository";

export class Repository {
  constructor(public user: IUserRepository) {}
}