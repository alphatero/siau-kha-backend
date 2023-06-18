import { Model } from 'mongoose';
import { FoodItemDocument } from 'src/core/models/food-item';
export declare class FoodItemsService {
    private readonly foodItemModel;
    constructor(foodItemModel: Model<FoodItemDocument>);
    getFoodItemsList(): Promise<{
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
