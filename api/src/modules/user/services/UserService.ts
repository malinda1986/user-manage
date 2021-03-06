import { Service, Container } from "typedi";

import { IFilter, IPaginate, IUser, IParams } from "../../types";
import { UserRepository, IUserRepository } from "../repository/user";

@Service()
export default class UserService {
  private user_repo: IUserRepository;
  constructor() {
    this.user_repo = Container.get(UserRepository);
  }

  public async create(params: IParams): Promise<IUser> {
    return this.user_repo.create(params);
  }

  public async get(id: number): Promise<IUser> {
    return this.user_repo.get(id);
  }

  public async update(id: number, data: IParams): Promise<IUser> {
    return this.user_repo.update(id, data);
  }

  public async delete(id: number): Promise<Boolean> {
    return this.user_repo.delete(id);
  }

  public async filter(filter: IFilter): Promise<IPaginate> {
    return this.user_repo.filter(filter);
  }
}
