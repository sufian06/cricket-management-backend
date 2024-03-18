import { Model } from 'mongoose';

export type IUser = {
  username: string;
  email?: string;
  role: string;
  password: string;
};

export type UserModel = {
  isPasswordCorrect(password: string): Promise<boolean>;
} & Model<IUser>;
