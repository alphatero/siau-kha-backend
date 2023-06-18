export declare class AddProductDto {
    product_name: string;
    product_type: number;
    product_tags: string;
    product_image: string;
    product_price: number;
    product_note: ProductNote[];
    food_consumption_list: FoodConsumption[];
}
interface ProductNote {
    note_title: string;
    use_money: number;
    is_food_consumption: boolean;
    food_consumption_list?: FoodConsumption[];
}
interface FoodConsumption {
    id: string;
    consumption_quantity: number;
}
export {};
