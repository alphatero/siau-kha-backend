export declare const getOrderDetailExample: {
    status: string;
    message: string;
    data: {
        order_detail: {
            id: string;
            product_detail: {
                id: string;
                product_name: string;
                product_price: number;
                product_quantity: number;
                product_note: string[];
                product_final_price: number;
                status: string;
            }[];
            create_time: string;
        }[];
        total: number;
    };
};
