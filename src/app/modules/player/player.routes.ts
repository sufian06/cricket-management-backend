import express from 'express';
import { PlayerController } from './player.controller';

const router = express.Router();

router.post('/', PlayerController.createPlayer);

router.get('/:id', PlayerController.getSinglePlayer);
router.get('/', PlayerController.getAllPlayers);

router.patch('/:id', PlayerController.updatePlayer);

router.delete('/:id', PlayerController.deletePlayer);

export const PlayerRoutes = router;
