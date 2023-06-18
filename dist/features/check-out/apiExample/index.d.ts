export declare const getCheckOutInfoExample: {
    status: string;
    message: string;
    data: {
        order: {
            customer_num: number;
            total: string;
            final_total: string;
            service_charge: string;
            create_time: string;
            order_detail: {
                product_name: string;
                product_price: string;
                product_quantity: string;
                product_final_price: string;
            }[];
            activities: {
                activities_name: string;
                discount_type: string;
                charge_type: string;
                activity_charge: string;
            };
        }[];
    };
};
export declare const basicExample: {
    status: string;
    message: string;
};
