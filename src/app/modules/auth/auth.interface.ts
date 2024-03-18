export type ILoginUser = {
  username?: string;
  email?: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
