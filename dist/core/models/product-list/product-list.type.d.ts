export interface ProductNote {
    note_title: string;
    use_money: number;
    is_food_consumption: boolean;
    food_consumption_list: Array<FoodConsumption>;
}
export interface FoodConsumption {
    id: string;
    consumption_quantity: number;
}
