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
import { SUBSCRIBE } from 'src/core/gateways/gateways.type';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';

// 設定 namespace
const namespace = GATEWAY_NAMESPACE.ORDER;

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

  /**
   * 外場 - 送出餐點紀錄
   * @param body
   */
  @UseFilters(WebSocketExceptionFilter)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage(SUBSCRIBE.ORDER_PRODUCT_DETAILS)
  async onOrder(@MessageBody() body: TableDataDto) {
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

  /**
   * 廚房 - 出菜
   * @param body
   */
  @UseFilters(WebSocketExceptionFilter)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage(SUBSCRIBE.PRODUCT_DETAILS)
  async onProductDetail(@MessageBody() body: UpdateProductDetailDto) {
    // TODO 出菜
    console.log(body.status);
    this.server.emit('onProductDetail', {
      ...body,
    });
  }

  // 當客戶端連接時觸發
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('order connected', { userId: client.id }); // 廣播訊息
  }

  // 當客戶端斷開時觸發
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('order disconnected', {
      userId: client.id,
    }); // 廣播訊息
  }
}
