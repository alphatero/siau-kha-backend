import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableDataDto } from './dto/table-data.dto';
export declare class OrderSocketGateway implements OnGatewayConnection {
    server: Server;
    handleMessage(body: TableDataDto): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
}
