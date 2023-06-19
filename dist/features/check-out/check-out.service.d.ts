import { Model } from 'mongoose';
import { Order } from 'src/core/models/order';
export declare class CheckOutService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    checkOut(id: string): Promise<void>;
    getCheckOutInfo(id: string): Promise<{
        order: {
            customer_num: number;
            total: number;
            final_total: number;
            service_charge: number;
            order_detail: {
                product_name: any;
                product_price: any;
                product_quantity: any;
                product_final_price: number;
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
        };
    }>;
    private calActivityDiscount;
}
