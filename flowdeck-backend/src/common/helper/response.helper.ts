import { HttpStatus } from '@nestjs/common';

export const successResponse = (
  message: string,
  data: any = {},
  total?: number,
  statusCode: number = HttpStatus.OK,
  path?: string,
) => ({
  status: true,
  message,
  data,
  total,
  statusCode,
  path,
  timestamp: new Date().toISOString(),
});

export const errorResponse = (
  message: string,
  error: any = null,
  statusCode: number = HttpStatus.BAD_REQUEST,
  path?: string,
) => ({
  status: false,
  message,
  error,
  statusCode,
  path,
  timestamp: new Date().toISOString(),
});
