import { CheckOutService } from './check-out.service';
export declare class CheckOutController {
    private readonly checkOutService;
    constructor(checkOutService: CheckOutService);
    getCheckOutInfo(id: string): Promise<{
        order: {
            customer_num: number;
            total: number;
            final_total: number;
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
            } | {
                activities_name?: undefined;
                discount_type?: undefined;
                charge_type?: undefined;
            };
        };
    }>;
    checkOut(id: string, final_price: number): Promise<void>;
}
