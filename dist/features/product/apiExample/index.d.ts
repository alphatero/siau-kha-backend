export declare const getProductTagsExample: {
    data: {
        product_tags: {
            id: string;
            tag_name: string;
            sort_no: number;
        }[];
    };
    status: string;
    message: string;
};
export declare const getProductListExample: {
    data: {
        product_list: {
            id: string;
            product_name: string;
            product_type: string;
            product_tags: string;
            product_image: string;
            product_price: number;
            product_note: {
                note_title: string;
                use_money: number;
                is_food_consumption: boolean;
                food_consumption_list: {
                    id: string;
                    consumption_quantity: number;
                }[];
            }[];
        }[];
    };
    status: string;
    message: string;
};
export declare const getProductExample: {
    data: {
        product: {
            id: string;
            product_name: string;
            product_type: string;
            product_tags: string;
            product_price: number;
            product_note: {
                note_title: string;
                use_money: number;
                is_food_consumption: boolean;
                food_consumption_list: {
                    id: string;
                    consumption_quantity: number;
                }[];
            }[];
        };
    };
    status: string;
    message: string;
};
