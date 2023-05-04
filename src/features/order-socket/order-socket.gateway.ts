import { Inject, UsePipes, UseFilters, ValidationPipe } from '@nestjs/common';
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

@WebSocketGateway({
  cors: {
    origin: '*',
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
    console.log(body);
    this.server.emit('onOrder', {
      ...body,
    });
  }

  // 應用程式啟動時觸發，抓取設定檔中的websocket port並監聽
  afterInit() {
    const orderProductDetails = this.configService.get<number>(
      'socketPort.orderProductDetails',
    );
    if (orderProductDetails) {
      this.server.listen(orderProductDetails);
    }
  }

  // 當客戶端連接時觸發
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  // 當客戶端斷開時觸發
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
