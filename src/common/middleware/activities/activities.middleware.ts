import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class ActivitiesMiddleware implements NestMiddleware {
  use(req: any, _: any, next: NextFunction) {
    const reqBody = req.body;
    if (reqBody.is_period) {
      const start_time = new Date(reqBody.start_time);
      const end_time = new Date(reqBody.end_time);
      if (end_time < new Date()) {
        throw new BadRequestException('end_time 不能早於現在時間');
      }

      if (end_time < start_time) {
        throw new BadRequestException('end_time 不能早於 start_time');
      }
    }

    next();
  }
}
