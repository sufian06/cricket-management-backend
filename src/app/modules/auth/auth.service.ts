import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { username, email, password } = payload;

  if (!username && !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'username or email is required');
  }

  // check user is exist
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // check valid password
  const userPassword = user.password;
  let validPassword = false;
  if (password) {
    const comparedPass = await bcrypt.compare(password, userPassword);
    validPassword = comparedPass;
  }
  if (!validPassword) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User password is not correct');
  }

  // create access token
  const { _id, username: userName } = user;
  const accessToken = jwtHelpers.createToken(
    { _id, userName },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    process.env.ACCESS_TOKEN_EXPIRY as string,
  );

  // create refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id, userName },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    process.env.REFRESH_TOKEN_EXPIRY as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
