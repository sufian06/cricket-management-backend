import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PlayerRoutes } from '../modules/player/player.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/players',
    route: PlayerRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
