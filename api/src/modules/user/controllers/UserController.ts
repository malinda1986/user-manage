import {
  JsonController,
  Get,
  Post,
  QueryParam,
  Body,
  Param,
  Put,
  Delete,
  UseBefore
} from "routing-controllers";
import Joi from "joi";
import { Container } from "typedi";

import Auth from "../../../middleware/auth"

import UserService from "../services/UserService";
import http from "../../../common/response";

/**
 * User controller, handle in-coming user routes
 */

@JsonController()
export class UserController {
  private user_service: UserService;

  constructor() {
    this.user_service = Container.get(UserService);
  }

  @Post("")
  async register(@Body() data: any) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        age: Joi.number().required(),
        profile: Joi.string().required(),
      });
      await schema.validateAsync(data);

      const response = await this.user_service.create(data);
      return http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Get("/:id")
  @UseBefore(Auth)
  async get(@Param("id") user: number) {
    try {
      const schema = Joi.object({
        user: Joi.number().required(),
      });
      await schema.validateAsync({ user });

      const response = await this.user_service.get(user);
      return http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Put("/:id")
  @UseBefore(Auth)
  async update(@Body() data: any, @Param("id") id: number) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        age: Joi.number().required(),
        profile: Joi.string().required(),
        id: Joi.number().required(),
      });
      await schema.validateAsync({id, ...data});

      const response = await this.user_service.update(id, data);
      return http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Delete("/:id")
  @UseBefore(Auth)
  async delete(@Param("id") id: number) {
    try {
      const schema = Joi.object({
        id: Joi.number().required(),
      });
      await schema.validateAsync({id});

      const response = await this.user_service.delete(id);
      return http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }


  @Get("")
  @UseBefore(Auth)
  async filter(
    @QueryParam("search") search: string,
    @QueryParam("current") page: number = 1,
    @QueryParam("pageSize") size: number = 10,
  ) {
    try {
      const filter = {
        search,
        page,
        size,
      };
      const registerResponse = await this.user_service.filter(filter);
      return http.createResponse(registerResponse);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
