import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TableDataDto } from './dto/table-data.dto';
import { OrderDetailService } from 'src/features/order-detail';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { DeleteProductDetailDto } from './dto/delete-product-detail.dto';
import { TableService } from 'src/features/table';
export declare class OrderSocketGateway implements OnGatewayConnection {
    private readonly orderDetailService;
    private readonly tableService;
    constructor(orderDetailService: OrderDetailService, tableService: TableService);
    server: Server;
    onOrder(body: TableDataDto): Promise<void>;
    onUpdateProductDetail(body: UpdateProductDetailDto): Promise<void>;
    onDeleteProductDetail(body: DeleteProductDetailDto): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
}
