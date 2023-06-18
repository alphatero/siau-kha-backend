import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// 建立http exception handler，並統一錯誤回傳格式
@Catch(HttpException)
export class HttpFilter<T extends HttpException> implements ExceptionFilter<T> {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getStatus();
    const message = (() => {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return response;
      }
      return (response as any).message;
    })();

    response.status(code).json({
      status: 'error',
      message,
      code,
    });
  }
}
