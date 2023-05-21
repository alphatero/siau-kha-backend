import { UsePipes, UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { TableDataDto } from './dto/table-data.dto';
import { WSValidationPipe } from '../../common/pipes';
import { WebSocketExceptionFilter } from 'src/common/filters/websocket/ws-exception.filter';
import {
  corsOrigin,
  gatewayPort as port,
  GATEWAY_NAMESPACE,
} from 'src/core/gateways';

// 設定 namespace
const namespace = GATEWAY_NAMESPACE.ORDER_PRODUCT_DETAILS;

@WebSocketGateway(port[namespace], {
  namespace,
  cors: {
    origin: Object.values(corsOrigin),
  },
})
export class OrderSocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @UseFilters(WebSocketExceptionFilter)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage(namespace)
  handleMessage(@MessageBody() body: TableDataDto): void {
    this.server.emit('onOrder', {
      ...body,
    });
  }

  // 當客戶端連接時觸發
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 當客戶端斷開時觸發
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
