import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Service, Container } from "typedi";

import { ILoginParams, IUser } from "../../types";
import configs from "../../../config";
import { UserRepository, IUserRepository } from "../../user/repository/user";

const { jwt_expire, jwt_sec } = configs;

/**
 * Login Service
 */

@Service()
export default class LoginService {
  private user_repo: IUserRepository;
  constructor() {
    this.user_repo = Container.get(UserRepository);
  }

  public createToken({ id }): string {
    const expiresIn = jwt_expire;
    const dataStoredInToken = {
      id,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    };
    return jwt.sign(dataStoredInToken, jwt_sec);
  }

  public async login(params: ILoginParams): Promise<IUser> {
    const user = await this.user_repo.findByEmail(params.email);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        params.password,
        user.password
      );
      if (isPasswordMatching) {
        return {
          ...user,
          token: this.createToken(user),
        };
      }
      throw new Error("Your email or password is incorrect.");
    } else {
      throw new Error("Your email or password is incorrect.");
    }
  }
}
