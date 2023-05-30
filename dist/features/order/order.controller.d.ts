import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrderActivities(order_id: string, a_id: string): Promise<void>;
    deleteOrderActivities(order_id: string, a_id: string): Promise<void>;
}
