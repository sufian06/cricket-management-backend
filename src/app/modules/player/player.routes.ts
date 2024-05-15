import express from 'express';
import { PlayerController } from './player.controller';

const router = express.Router();

router.post('/', PlayerController.createPlayer);

router.get('/', PlayerController.getAllPlayers);

export const PlayerRoutes = router;
