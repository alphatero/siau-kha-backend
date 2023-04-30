import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SignInMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const reqBody = req.body;
    if (!reqBody.user_account && !reqBody.user_mima) {
      throw new BadRequestException('未帶入必要參數：user_account, user_mima');
    }
    if (!reqBody.user_account) {
      throw new BadRequestException('未帶入必要參數：user_account');
    }
    if (!reqBody.user_mima) {
      throw new BadRequestException('未帶入必要參數：user_mima');
    }
    next();
  }
}
