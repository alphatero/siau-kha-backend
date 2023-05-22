import { ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
export declare class WebSocketExceptionFilter implements WsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost): any;
}
