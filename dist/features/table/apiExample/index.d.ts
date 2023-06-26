export declare const getTableListExample: {
    data: {
        table_list: ({
            id: string;
            table_name: string;
            seat_max: number;
            status: string;
            customer_num: number;
            create_time: string;
            is_pay: boolean;
            order_id: string;
            order_detail: {
                order_detail_id: string;
                id: string;
                product_name: string;
                product_note: string[];
                status: string;
                is_delete: boolean;
                order_time: string;
            }[][];
        } | {
            id: string;
            table_name: string;
            seat_max: number;
            status: string;
            customer_num?: undefined;
            create_time?: undefined;
            is_pay?: undefined;
            order_id?: undefined;
            order_detail?: undefined;
        })[];
    };
    status: string;
    message: string;
};
