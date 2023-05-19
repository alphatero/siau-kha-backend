import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class ActivitiesMiddleware implements NestMiddleware {
    use(req: any, _: any, next: NextFunction): void;
}
