import {
  JsonController,
  Body,
  Post
} from "routing-controllers";
import Joi from "joi";
import { Container } from "typedi";

import LoginService from "../services/LoginService";
import http from "../../../common/response";

/**
 * Login controller, handle in-coming login routes
 */

@JsonController()
export class LoginController {
  private login_service: LoginService;

  constructor() {
    this.login_service = Container.get(LoginService);
  }

  @Post("")
  async login(@Body() data: any) {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      await schema.validateAsync(data);

      const response = await this.login_service.login(data);
      return http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

}
