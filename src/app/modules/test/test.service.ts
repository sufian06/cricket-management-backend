import { Test } from './test.model';

const createTest = async (data: any) => {
  const { title } = data;
  const result = await Test.create({ title });
  return result;
};

export const TestService = {
  createTest,
};
