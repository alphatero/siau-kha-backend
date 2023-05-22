import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebSocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };

    console.log('details', details);
    // 發送錯誤訊息給客戶端
    client.emit('onError', { status: 'error', message: details.message });
  }
}
