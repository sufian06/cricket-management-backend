import express from 'express';
import { PlayerController } from './player.controller';

const router = express.Router();

router.post('/', PlayerController.createPlayer);

export const PlayerRoutes = router;
