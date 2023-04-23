import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = response.statusCode;
    return next.handle().pipe(
      map((data) => {
        console.log('data', data);
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
