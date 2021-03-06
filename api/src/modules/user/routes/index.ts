import { Router } from 'express';
import { useExpressServer } from 'routing-controllers';
import { UserController } from '../controllers/UserController';

/**
 * Register users route and attached user controller
 */
export default (app: Router) => {
  useExpressServer(app, {
    routePrefix: '/users',
    controllers: [UserController],
  });
};
