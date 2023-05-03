import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activities, ActivitiesSchema } from 'src/core/models/activities';
import { Order, OrderSchema } from 'src/core/models/order';
import {
  OrderDetail,
  OrderDetailSchema,
} from 'src/core/models/order-detail/order-detail.model';
import {
  ProductDetail,
  ProductDetailSchema,
} from 'src/core/models/product-detail';
import { TableMain, TableMainSchema } from 'src/core/models/table-main';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: TableMain.name,
        schema: TableMainSchema,
      },
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
        name: Activities.name,
        schema: ActivitiesSchema,
      },
    ]),
  ],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
