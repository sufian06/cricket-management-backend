import express from 'express';
import { TestRoutes } from '../modules/test/test.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/tests',
    route: TestRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
