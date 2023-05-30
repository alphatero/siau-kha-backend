import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { isToday } from 'src/common/utils/time';
import { validateObjectIds } from 'src/common/utils/validate';
import { Order, OrderDocument, OrderStatus } from 'src/core/models/order';
import {
  Reservation,
  ReservationDocument,
  ReservationStatus,
} from 'src/core/models/reservation';
import {
  TableMain,
  TableMainDocument,
  TableStatus,
} from 'src/core/models/table-main';
import { IUserPayload } from '../auth';
import { CreateReservationDto } from './dto/check-in-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
    @InjectModel(TableMain.name)
    private readonly tableMainModel: Model<TableMainDocument>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  public async createReservation(dto: CreateReservationDto, userId: string) {
    const targetReservation = {
      ...dto,
      status: ReservationStatus.WAIT,
      create_user: new Types.ObjectId(userId),
    };
    return this.reservationModel.create(targetReservation);
  }

  public async getReservationWaitList() {
    // 只取今日預約
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 設定時間為當天的起始時間

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // 設定時間為明天的起始時間

    const query = await this.reservationModel
      .find({
        status: ReservationStatus.WAIT,
        create_time: {
          $gte: today,
          $lt: tomorrow,
        },
      })
      .sort({ create_time: 1 });

    const reservation_list = query.map((doc) => {
      const reservation = doc.toJSON();
      return {
        id: reservation._id,
        name: reservation.name,
        phone: reservation.phone,
        customer_num: reservation.customer_num,
        create_time: reservation.create_time,
        status: reservation.status,
      };
    });

    return { reservation_list };
  }

  public async changeReservationStatus(
    id: string,
    action: ReservationStatus,
    user?: IUserPayload,
    tableId?: string,
    customerNum?: number,
  ) {
    if (action === ReservationStatus.CANCEL) {
      validateObjectIds({ id });

      const updatedReservation = await this.reservationModel.findOneAndUpdate(
        { _id: id, status: ReservationStatus.WAIT },
        { status: action },
      );

      if (!updatedReservation) {
        throw new BadRequestException('找不到此筆預約');
      }
    } else {
      // 安排入座
      // 1. [v] 檢查id, tableId格式。
      // 2. [v] 檢查用餐人數格式是否為正整數，且大於0。
      // 3. [v] 檢查預約是否存在，且狀態為WAIT，並取得相關資訊(用餐人數)。
      // 4. [v] 檢查桌號是否存在。
      // 5. [v] 檢查桌號是否為空閒。
      // 6. [v] 檢查目標預約是否為今日。
      // 7. [v] 檢查用餐人數是否超過用餐人數上限。
      // 8. [v] 因為會對 reservation、TableMain、Order 三個不同的 collection 進行操作，每個 collection 都要開 session。
      // 9. [v] 透過 session.withTransaction() 來執行交易事務。
      // 10.[v] 更新reservation。
      // 11.[v] 建立訂單。
      // 12.[v] 更新桌況及寫入新建訂單。
      // 13.[v] 3個collection都更新成功後，才會commit，否則rollback。
      // [v] catch error 則 abortTransaction。
      // [v] 最後結束session。

      validateObjectIds({ id, table_id: tableId });

      if (!Number.isInteger(customerNum)) {
        throw new BadRequestException('用餐人數需為正整數');
      }

      if (customerNum <= 0) {
        throw new BadRequestException('用餐人數不得小於1');
      }

      const target_reservation: ReservationDocument =
        await this.reservationModel.findById(id).exec();

      if (!target_reservation) {
        throw new BadRequestException('找不到此筆預約');
      }

      if (target_reservation.status !== ReservationStatus.WAIT) {
        throw new BadRequestException(
          `此筆預約已處理過，狀態為${target_reservation.status}，無法安排入座`,
        );
      }

      const checkIsToday = isToday(target_reservation.create_time);
      if (!checkIsToday) {
        throw new BadRequestException('此筆預約非今日預約，無法安排入座');
      }

      const table_main = await this.tableMainModel.findById(tableId).exec();
      if (!table_main || table_main.is_delete) {
        throw new BadRequestException('找不到此桌號');
      }

      if (table_main.status === TableStatus.MEAL) {
        throw new BadRequestException('此桌次為用餐中, 無法安排入座');
      }

      if (customerNum > table_main.seat_max + 2) {
        throw new BadRequestException(
          `預設可容納人數為 ${table_main.seat_max}, 實際人數可超過「預設可容納人數」最多兩位`,
        );
      }

      const tableSession = await this.tableMainModel.db.startSession();
      const orderSession = await this.orderModel.db.startSession();
      const reservationSession = await this.reservationModel.db.startSession();

      tableSession.startTransaction();
      orderSession.startTransaction();
      reservationSession.startTransaction();

      try {
        // 1. 更新reservation
        await this.reservationModel.findOneAndUpdate(
          {
            _id: id,
            status: ReservationStatus.WAIT,
          },
          { status: action, customer_num: customerNum },
          { session: reservationSession, new: true },
        );

        // 2. 建立訂單
        const createdOrder: OrderDocument[] = await this.orderModel.create(
          [
            {
              table_main: new Types.ObjectId(tableId),
              customer_num: customerNum,
              status: OrderStatus.IN_PROGRESS,
              create_user: new Types.ObjectId(user.id),
            },
          ],
          {
            session: orderSession,
          },
        );

        // 3. 更新桌位，並寫入新建訂單
        await this.tableMainModel.findByIdAndUpdate(
          tableId,
          {
            status: TableStatus.MEAL,
            order: new Types.ObjectId(createdOrder[0]._id),
          },
          {
            session: tableSession,
          },
        );

        await tableSession.commitTransaction();
        await orderSession.commitTransaction();
        await reservationSession.commitTransaction();
      } catch (error) {
        await tableSession.abortTransaction();
        await orderSession.abortTransaction();
        await reservationSession.abortTransaction();
        throw error;
      } finally {
        tableSession.endSession();
        orderSession.endSession();
        reservationSession.endSession();
      }
    }
  }
}
