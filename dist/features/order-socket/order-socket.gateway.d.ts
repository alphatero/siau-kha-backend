import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableDataDto } from './dto/table-data.dto';
import { OrderDetailService } from 'src/features/order-detail';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { DeleteProductDetailDto } from './dto/delete-product-detail.dto';
export declare class OrderSocketGateway implements OnGatewayConnection {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    server: Server;
    onOrder(body: TableDataDto): Promise<void>;
    onUpdateProductDetail(body: UpdateProductDetailDto): Promise<void>;
    onDeleteProductDetail(body: DeleteProductDetailDto): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
}
