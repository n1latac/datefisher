import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string;
    let status_code: number;
    let messages = {};

    console.error(exception);

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      const validationMessages = (exceptionResponse as any).message;

      httpStatus = HttpStatus.BAD_REQUEST;
      message = Array.isArray(validationMessages)
        ? validationMessages[0]
        : validationMessages || 'Bad Request';
      messages = Array.isArray(validationMessages) ? validationMessages : {};
      status_code = 4000; // validation error
    } else if (exception instanceof NotFoundException) {
      httpStatus = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
      status_code = 4040; // code for 'not found'
    } else if (exception instanceof UnauthorizedException) {
      httpStatus = HttpStatus.UNAUTHORIZED;
      message = (exception as any).message || 'Unauthorized';
      status_code = 4010; // \code for 'not unauthorized'
    } else if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      message = (exceptionResponse as any).message || 'Error';
      status_code = (exceptionResponse as any).status_code || httpStatus;
      messages = (exceptionResponse as any).messages || {};
    } else {
      // unexpected error
      message = 'Internal Server Error';
      status_code = 5000;
    }

    const responseBody = {
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      status_code,
      messages,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
