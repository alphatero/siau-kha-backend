import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserPayload = createParamDecorator(
  (input: string, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { user } = request;

    return input ? user?.[input] : user;
  },
);
