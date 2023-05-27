import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodGroup, FoodGroupSchema } from 'src/core/models/food-group';
import { FoodItem, FoodItemSchema } from 'src/core/models/food-item';
import { FoodItemsController } from './food-items.controller';
import { FoodItemsService } from './food-items.service';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: FoodItem.name,
        schema: FoodItemSchema,
      },
      {
        name: FoodGroup.name,
        schema: FoodGroupSchema,
      },
    ]),
  ],
  controllers: [FoodItemsController],
  providers: [FoodItemsService],
})
export class FoodItemsModule {}
