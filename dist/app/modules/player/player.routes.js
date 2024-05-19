"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("./player.controller");
const router = express_1.default.Router();
router.post('/', player_controller_1.PlayerController.createPlayer);
router.get('/:id', player_controller_1.PlayerController.getSinglePlayer);
router.get('/', player_controller_1.PlayerController.getAllPlayers);
router.patch('/:id', player_controller_1.PlayerController.updatePlayer);
router.post('/:id/add-match', player_controller_1.PlayerController.addMatchData);
router.delete('/:id', player_controller_1.PlayerController.deletePlayer);
exports.PlayerRoutes = router;
