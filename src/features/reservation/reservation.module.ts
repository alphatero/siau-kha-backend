import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/core/models/reservation';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Order, OrderSchema } from 'src/core/models/order';
import { TableMain, TableMainSchema } from 'src/core/models/table-main';
@Module({
  imports: [
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
      {
        name: TableMain.name,
        schema: TableMainSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
