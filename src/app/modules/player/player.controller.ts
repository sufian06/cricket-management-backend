import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IPlayer } from './player.interface';
import { PlayerService } from './player.service';

const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const { ...playerData } = req.body;
  const result = await PlayerService.createPlayer(playerData);

  sendResponse<IPlayer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player added successfully.',
    data: result,
  });
});

export const PlayerController = {
  createPlayer,
};
