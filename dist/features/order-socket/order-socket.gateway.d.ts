import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableDataDto } from './dto/table-data.dto';
import { OrderDetailService } from 'src/features/order-detail';
export declare class OrderSocketGateway implements OnGatewayConnection {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    server: Server;
    handleMessage(body: TableDataDto): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
}
