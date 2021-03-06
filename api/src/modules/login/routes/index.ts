import { Router } from "express";
import { useExpressServer } from "routing-controllers";
import { LoginController } from "../controllers/LoginController";

/**
 * Register login route and attached login controller
 */
export default (app: Router) => {
  useExpressServer(app, {
    routePrefix: "/login",
    controllers: [LoginController],
  });
};
