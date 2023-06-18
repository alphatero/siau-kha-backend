export declare const getFoodItemsExample: {
    data: {
        foodItems: {
            id: string;
            food_items_name: string;
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
    };
    status: string;
    message: string;
};
