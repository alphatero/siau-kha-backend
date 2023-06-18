import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { ProductDetailStatus } from 'src/core/models/product-detail';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    postOrderDetail(orderId: string, orderDetail: CreateOrderDetailDto): Promise<void>;
    patchOrderDetail(orderId: string, detailId: string, pId: string): Promise<void>;
    deleteOrderDetail(orderId: string, detailId: string, pId: string): Promise<void>;
    getOrderDetail(id: string): Promise<{
        order_detail: {
            id: any;
            product_detail: {
                id: any;
                product_name: string;
                product_price: number;
                product_quantity: number;
                product_note: string[];
                status: ProductDetailStatus;
                is_delete: boolean;
                order_time: string;
            }[];
            activities: {
                activities_name: string;
                discount_type: string;
                charge_type: string;
                activity_charge: number;
            } | {
                activities_name?: undefined;
                discount_type?: undefined;
                charge_type?: undefined;
                activity_charge?: undefined;
            };
            create_time: Date;
        }[];
        total: number;
    }>;
}
