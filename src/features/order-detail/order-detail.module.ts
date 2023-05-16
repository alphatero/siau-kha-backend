import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import {
  ProductDetailSchema,
  ProductDetail,
} from 'src/core/models/product-detail';
import { Order, OrderSchema } from 'src/core/models/order';
import { OrderDetail, OrderDetailSchema } from 'src/core/models/order-detail';
import { ProductList, ProductListSchema } from 'src/core/models/product-list';
import { Activities, ActivitiesSchema } from 'src/core/models/activities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: OrderDetail.name,
        schema: OrderDetailSchema,
      },
      {
        name: ProductDetail.name,
        schema: ProductDetailSchema,
      },
      {
        name: ProductList.name,
        schema: ProductListSchema,
      },
      {
        name: Activities.name,
        schema: ActivitiesSchema,
      },
    ]),
  ],
  providers: [OrderDetailService],
  controllers: [OrderDetailController],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
