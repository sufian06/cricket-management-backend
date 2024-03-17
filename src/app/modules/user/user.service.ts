import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createAdmin = async (user: IUser): Promise<IUser | null> => {
  const { username, email } = user;

  const existedUsername = await User.findOne({
    username,
  });
  if (existedUsername) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'username is already exist, use another username!',
    );
  }

  const existedEmail = await User.findOne({
    email,
  });
  if (existedEmail) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This email is already exist, use another email!',
    );
  }

  // set role
  user.role = 'admin';

  const createdUser = await User.create(user);
  const result = await User.findById(createdUser._id).select('-password');

  return result;
};

export const UserService = {
  createAdmin,
};
