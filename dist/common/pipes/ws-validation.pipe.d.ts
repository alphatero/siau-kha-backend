import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
export declare class WSValidationPipe extends ValidationPipe {
    createExceptionFactory(): (validationErrors?: any[]) => WsException;
}
