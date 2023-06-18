import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    const status = 'success';
    const message = '成功';

    return next.handle().pipe(
      map((data) => {
        return {
          status,
          message,
          data,
        };
      }),
    );
  }
}
