import * as bcrypt from "bcryptjs";
import { Service } from "typedi";
import User from "../../models/user";
import { IParams, IUser } from "../../types/index";

export interface IUserRepository {
  get: Function;
  create: Function;
  update: Function;
  delete: Function;
  filter: Function;
  findByEmail: Function;
}
/**
 * UserRepository, handle user related DB operations
 */
@Service()
export class UserRepository {
  public async get(id: number): Promise<any> {
    console.log("Get user: Triggered");
    try {
      const user = await User.findOne({ where: { id }, raw: true });
      //@ts-ignore
      delete user.password;
      return user;
    } catch (error) {
      console.error("Get user: Failed ", error);
      throw new Error(error.message);
    }
  }

  public async create(params: IParams): Promise<IUser | boolean> {
    console.log("Create user: Triggered", params);

    try {
      if (await User.findOne({ where: { email: params.email }, raw: true })) {
        throw new Error(`User with email ${params.email} already exists.`);
      }
      const hashedPassword = await bcrypt.hash(params.password, 10);
      delete params.password;
      const user = await User.create({
        ...params,
        password: hashedPassword,
        raw: true,
      });
      if (user) {
        //@ts-ignore
        delete user.password;
        //@ts-ignore
        return user;
      }
      return false;
    } catch (error) {
      console.error("Create user: Failed ", error);
      throw new Error(error.message);
    }
  }

  public async update(id: number, params: IParams): Promise<IUser | boolean> {
    console.log("Update user: Triggered");
    try {
      const updatedUser = await User.update(
        { ...params },
        {
          where: { id },
          returning: true,
        }
      );
      if (updatedUser && updatedUser[0] && updatedUser[0] >= 1) {
        //@ts-ignore
        delete updatedUser[1][0].dataValues.password;
        //@ts-ignore
        return updatedUser[1][0].dataValues
      }
      //@ts-ignore
      return updatedUser
      return false;
    } catch (error) {
      console.error("Update user: Failed ", error);
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<boolean> {
    console.log("Delete user: Triggered");
    try {
      const user = await User.destroy({ where: { id } });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Delete user: Failed ", error);
      throw new Error(error.message);
    }
  }

  public async filter(params: any): Promise<any> {
    console.log("Filter users: Triggered");

    console.log(params);
    const { size, page, search } = params;
    try {
      let where = {};
      if (search) {
        where = {
          first_name: search,
        };
      }
      const users = await User.findAll({
        where,
        limit: size,
        offset: (page - 1) * size,
        order: ["createdAt"],
        raw: true,
      });

      const totalCount = await User.findAndCountAll({
        where,
      });
      const total =
        totalCount && totalCount.count
          ? Math.ceil(totalCount.count / size)
          : 0;
      return {
        users,
        pagination: {
          per_page: size,
          page: page | 0,
          pages: total | 0,
          total: totalCount.count | 0
        },
      };
    } catch (error) {
      console.error("Filter users: Failed ", error);
      throw new Error(error.message);
    }
  }

  public async findByEmail(email: string): Promise<any> {
    console.log("Filter users: Triggered");
    try {
      const user = await User.findOne({ raw: true, where: { email } });
      return user;
    } catch (error) {
      console.error("Filter users: Failed ", error);
      throw new Error(error.message);
    }
  }
}
