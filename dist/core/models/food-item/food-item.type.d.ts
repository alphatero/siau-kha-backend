export declare enum FoodItemsStatus {
    IN_USE = "0",
    BELOW_SAFETY_STOCK = "1",
    DISABLED = "2"
}
export interface ProductNote {
    id: string;
    note_title: string;
    use_money: number;
    is_food_consumption: boolean;
    food_consumption_list: Array<FoodConsumption>;
}
export interface FoodConsumption {
    id: string;
    food_name: string;
    quantity: number;
    unit: string;
}
