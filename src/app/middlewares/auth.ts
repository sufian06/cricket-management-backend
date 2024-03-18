import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelper';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
    }

    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret,
    );
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
