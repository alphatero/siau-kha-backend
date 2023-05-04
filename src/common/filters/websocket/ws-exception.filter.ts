import { Catch, ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WebSocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost): any {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    // 取得錯誤訊息
    // const wsError = exception.getError();

    const message = 'socket error';

    // 发送错误消息给客户端
    client.emit('onError', { status: 'error', message });
  }
}
