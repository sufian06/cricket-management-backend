import express from 'express';
import { TestController } from './test.controller';

const router = express.Router();

router.post('/', TestController.createTest);

export const TestRoutes = router;
