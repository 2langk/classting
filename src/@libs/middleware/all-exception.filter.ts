import { Response } from 'express';

import { AppException } from '@libs/common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // operational exception
    if (exception instanceof AppException) {
      if (exception.additional)
        console.log(`[ERROR] ${exception.message}, ${JSON.stringify(exception.additional)}`);

      return res.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        name: exception.name,
        message: exception.message,
      });
    }

    // input validation exception
    if ((exception as any)?.response?.path) {
      return res.status(400).json(new AppException('invalid request data.'));
    }

    // nestjs exception
    if (exception instanceof HttpException) {
      console.log(exception);

      return res.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        name: exception.name,
        message: exception.message,
      });
    }

    console.log(`[ERROR] ${exception.message ?? exception}`);

    return res.status(500).json(new AppException('internal server error.', 500));
  }
}
