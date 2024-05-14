import { IPlayer } from './player.interface';
import { Player } from './player.model';

const createPlayer = async (payload: IPlayer): Promise<IPlayer> => {
  const result = await Player.create(payload);
  return result;
};

export const PlayerService = {
  createPlayer,
};
