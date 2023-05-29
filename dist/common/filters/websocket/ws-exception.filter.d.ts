import { ArgumentsHost, HttpException } from '@nestjs/common';
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets';
export declare class WebSocketExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: WsException | HttpException, host: ArgumentsHost): any;
}
