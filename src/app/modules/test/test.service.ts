import { Test } from './test.model';

const createTest = async (data: any) => {
  const result = await Test.create(data);
  return result;
};

export const TestService = {
  createTest,
};
