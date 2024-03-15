import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TestService } from './test.service';

const createTest = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await TestService.createTest(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test created successfully',
    data: result,
  });
});

export const TestController = { createTest };
