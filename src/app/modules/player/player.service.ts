import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { playerFilterableFields } from './player.constants';
import { IPlayer, IPlayerFilters } from './player.interface';
import { Player } from './player.model';

const createPlayer = async (payload: IPlayer): Promise<IPlayer | null> => {
  const result = await Player.create(payload);
  return result;
};

const getAllPlayers = async (
  filters: IPlayerFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IPlayer[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: playerFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Player.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Player.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePlayer = async (id: string): Promise<IPlayer | null> => {
  const result = await Player.findOne({ _id: id });

  return result;
};

const updatePlayer = async (
  id: string,
  payload: Partial<IPlayer>,
): Promise<IPlayer | null> => {
  const isPlayerExist = await Player.findOne({ _id: id });
  if (!isPlayerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Player not found');
  }
  const result = await Player.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deletePlayer = async (id: string): Promise<IPlayer | null> => {
  const result = await Player.findByIdAndDelete(id);
  return result;
};

export const PlayerService = {
  createPlayer,
  getAllPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
