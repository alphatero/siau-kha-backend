import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/models/order';
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
    ]),
  ],
  controllers: [CheckOutController],
  providers: [CheckOutService],
})
export class CheckOutModule {}
