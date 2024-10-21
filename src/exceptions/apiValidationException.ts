import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiValidationException extends HttpException {
  constructor(data?: {
    message?: string;
    http_status?: number;
    status_code?: number;
    messages?: object;
  }) {
    const {
      message = 'Internal Server Error',
      http_status = HttpStatus.BAD_REQUEST,
      status_code = 4000,
      messages = {},
    } = data || {};
    super(
      {
        message,
        status_code,
        messages,
      },
      http_status,
    );
  }
}
