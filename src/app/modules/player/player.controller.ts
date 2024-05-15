import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { playerFilterableFields } from './player.constants';
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

const getAllPlayers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, playerFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PlayerService.getAllPlayers(filters, paginationOptions);

  sendResponse<IPlayer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Players retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePlayer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PlayerService.getSinglePlayer(id);

  sendResponse<IPlayer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single player retrieved successfully !',

    data: result,
  });
});

const updatePlayer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await PlayerService.updatePlayer(id, payload);

  sendResponse<IPlayer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player updated successfully.',

    data: result,
  });
});

const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PlayerService.deletePlayer(id);

  sendResponse<IPlayer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player deleted successfully.',

    data: result,
  });
});

export const PlayerController = {
  createPlayer,
  getAllPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
