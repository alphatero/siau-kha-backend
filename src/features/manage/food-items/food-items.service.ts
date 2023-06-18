import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodItem, FoodItemDocument } from 'src/core/models/food-item';

@Injectable()
export class FoodItemsService {
  constructor(
    @InjectModel(FoodItem.name)
    private readonly foodItemModel: Model<FoodItemDocument>,
  ) {}
  public async getFoodItemsList() {
    const documents = await this.foodItemModel.find({
      is_delete: false,
    });
    const foodItems = documents.map((doc) => {
      const foodItem = doc.toJSON();
      return {
        id: foodItem._id,
        food_items_name: foodItem.food_items_name,
        group: foodItem.group,
        purchase_cost: foodItem.purchase_cost,
        item_stock: foodItem.item_stock,
        safety_stock: foodItem.safety_stock,
        status: foodItem.status,
        units: foodItem.units,
      };
    });
    return { foodItems };
  }
}
