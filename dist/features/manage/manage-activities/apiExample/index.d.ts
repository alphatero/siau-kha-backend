export declare const getActivitiesExample: {
    status: string;
    message: string;
    data: {
        act_list: {
            id: string;
            activities_name: string;
            discount_type: string;
            charge_type: string;
            min_spend: number;
            discount: number;
            is_period: boolean;
            start_time: string;
            end_time: string;
            act_products_list: {
                id: string;
                product_name: string;
                product_type: string;
                product_price: number;
            }[];
            status: boolean;
        }[];
    };
};
