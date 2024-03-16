import { IUser } from './user.interface';
import { User } from './user.model';

const createAdmin = async (user: IUser): Promise<IUser | null> => {
  // set role
  user.role = 'admin';

  const createdUser = await User.create(user);
  const result = await User.findById(createdUser._id).select('-password');

  return result;
};

export const UserService = {
  createAdmin,
};
