import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

// todo 建立一個攔截器，將回傳的資料包裝成 { status  message data }
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = response.statusCode;
    return next.handle().pipe(
      map((data) => {
        const timestamp = new Date().toISOString();
        return {
          code,
          data,
          timestamp,
        };
      }),
    );
  }
}
