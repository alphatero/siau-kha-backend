import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from 'src/core/models/order';
import { MongooseModule } from '@nestjs/mongoose';
import { Activities, ActivitiesSchema } from 'src/core/models/activities';

@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Activities.name,
        schema: ActivitiesSchema,
      },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
