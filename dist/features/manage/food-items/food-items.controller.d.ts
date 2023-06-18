import { FoodItemsService } from './food-items.service';
export declare class FoodItemsController {
    private readonly foodItemsService;
    constructor(foodItemsService: FoodItemsService);
    getActivity(): Promise<{
        foodItems: {
            id: any;
            food_items_name: string;
            group: string;
            purchase_cost: number;
            item_stock: number;
            safety_stock: number;
            status: string;
            units: string;
        }[];
    }>;
}
