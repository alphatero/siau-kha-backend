export declare const getTagsExample: {
    data: {
        list: {
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
        list: {
            id: string;
            product_name: string;
            product_type: number;
            product_tags: string;
            product_image: string;
            product_note: {
                note_title: string;
                use_money: number;
                is_food_consumption: boolean;
                food_consumption_list: {
                    id: string;
                    consumption_quantity: number;
                    food_item_name: string;
                    group: {
                        _id: string;
                        group_name: string;
                        is_delete: boolean;
                    }[];
                    purchase_cost: number;
                    item_stock: number;
                    safety_stock: number;
                    status: string;
                    units: string;
                }[];
            }[];
            food_consumption_list: ({
                id: string;
                consumption_quantity: number;
                food_item_name?: undefined;
                group?: undefined;
                purchase_cost?: undefined;
                item_stock?: undefined;
                safety_stock?: undefined;
                status?: undefined;
                units?: undefined;
            } | {
                consumption_quantity: number;
                id: string;
                food_item_name: string;
                group: {
                    _id: string;
                    group_name: string;
                    is_delete: boolean;
                }[];
                purchase_cost: number;
                item_stock: number;
                safety_stock: number;
                status: string;
                units: string;
            })[];
            is_delete: boolean;
        }[];
    };
    status: string;
    message: string;
};
export declare const getProductExample: {
    data: {
        id: string;
        product_name: string;
        product_type: number;
        product_tags: string;
        product_image: string;
        product_note: {
            note_title: string;
            use_money: number;
            is_food_consumption: boolean;
            food_consumption_list: {
                id: string;
                consumption_quantity: number;
                food_item_name: string;
                group: {
                    _id: string;
                    group_name: string;
                    is_delete: boolean;
                }[];
                purchase_cost: number;
                item_stock: number;
                safety_stock: number;
                status: string;
                units: string;
            }[];
        }[];
        food_consumption_list: ({
            id: string;
            consumption_quantity: number;
            food_item_name?: undefined;
            group?: undefined;
            purchase_cost?: undefined;
            item_stock?: undefined;
            safety_stock?: undefined;
            status?: undefined;
            units?: undefined;
        } | {
            consumption_quantity: number;
            id: string;
            food_item_name: string;
            group: {
                _id: string;
                group_name: string;
                is_delete: boolean;
            }[];
            purchase_cost: number;
            item_stock: number;
            safety_stock: number;
            status: string;
            units: string;
        })[];
        is_delete: boolean;
    };
    status: string;
    message: string;
};
