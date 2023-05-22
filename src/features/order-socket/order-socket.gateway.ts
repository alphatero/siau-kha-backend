import { UsePipes, UseFilters, Injectable } from '@nestjs/common';
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
import { OrderDetailService } from 'src/features/order-detail';
import { CreateOrderDetailDto } from 'src/features/order-detail/dto/create-order-detail.dto';

// 設定 namespace
const namespace = GATEWAY_NAMESPACE.ORDER_PRODUCT_DETAILS;

@WebSocketGateway(port[namespace], {
  namespace,
  cors: {
    origin: Object.values(corsOrigin),
  },
})
@Injectable()
export class OrderSocketGateway implements OnGatewayConnection {
  constructor(private readonly orderDetailService: OrderDetailService) {}
  @WebSocketServer()
  server: Server;

  @UseFilters(WebSocketExceptionFilter)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage(namespace)
  async handleMessage(@MessageBody() body: TableDataDto) {
    const product_detail = body.product_detail.map((item) => {
      return {
        product_id: item.product_id,
        product_quantity: item.product_quantity,
        product_note: item.product_note,
      };
    });

    const orderDetailDto: CreateOrderDetailDto = {
      product_detail,
    };

    await this.orderDetailService.orderFlow(orderDetailDto, body.order_id);
    this.server.emit('onOrder', {
      ...body,
    });
  }

  // 當客戶端連接時觸發
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit(' order-product-details-connected', { userId: client.id }); // 廣播訊息
  }

  // 當客戶端斷開時觸發
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('order-product-details-disconnected', {
      userId: client.id,
    }); // 廣播訊息
  }
}
