import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AddProductMiddleware,
  UpdateProductMiddleware,
} from 'src/common/middleware';
import { FoodItem, FoodItemSchema } from 'src/core/models/food-item';
import { ProductList, ProductListSchema } from 'src/core/models/product-list';
import { ProductTags, ProductTagsSchema } from 'src/core/models/product-tags';
import { ManageProductController } from './manage-product.controller';
import { ManageProductService } from './manage-product.service';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: ProductTags.name,
        schema: ProductTagsSchema,
      },
      {
        name: ProductList.name,
        schema: ProductListSchema,
      },
      {
        name: FoodItem.name,
        schema: FoodItemSchema,
      },
    ]),
  ],
  controllers: [ManageProductController],
  providers: [ManageProductService],
  exports: [ManageProductService],
})
export class ManageProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddProductMiddleware)
      .forRoutes({
        path: 'manage/product',
        method: RequestMethod.POST,
      })
      .apply(UpdateProductMiddleware)
      .forRoutes({
        path: 'manage/product/:p_id',
        method: RequestMethod.PUT,
      });
  }
}
