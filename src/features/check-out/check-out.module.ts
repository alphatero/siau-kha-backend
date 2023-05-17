import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activities, ActivitiesSchema } from 'src/core/models/activities';
import { Order, OrderSchema } from 'src/core/models/order';
import { OrderDetail, OrderDetailSchema } from 'src/core/models/order-detail';
import { CheckOutController } from './check-out.controller';
import { CheckOutService } from './check-out.service';

@Module({
  imports: [
    // 建立Mongo資料庫連線
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
        name: Activities.name,
        schema: ActivitiesSchema,
      },
    ]),
  ],
  controllers: [CheckOutController],
  providers: [CheckOutService],
})
export class CheckOutModule {}
