import { Inject, UsePipes, UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

import { TableDataDto } from './dto/table-data.dto';
import { WSValidationPipe } from '../../common/pipes';
import { WebSocketExceptionFilter } from 'src/common/filters/websocket/ws-exception.filter';
import { corsOrigin, gatewayPort as port } from 'src/common/gateways';

// * 設定 namespace
const namespace = 'order-product-details';

@WebSocketGateway({
  namespace,
  port,
  cors: {
    origin: Object.values(corsOrigin),
  },
})
export class OrderSocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @UseFilters(WebSocketExceptionFilter)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('order-product-details')
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
