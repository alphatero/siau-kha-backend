import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
  ReservationStatus,
} from 'src/core/models/reservation';
import { CreateReservationDto } from './dto/check-in-reservation.dto';

function validateObjectIds(ids) {
  Object.entries(ids).forEach(([key, value]: [string, string]) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${key}格式錯誤`);
    }
  });
}

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
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

    const query = this.reservationModel
      .find({
        status: ReservationStatus.WAIT,
        create_time: {
          $gte: today,
          $lt: tomorrow,
        },
      })
      .sort({ create_time: 1 });
    return query;
  }

  public async changeReservationStatus(
    id: string,
    action: ReservationStatus,
    tableId?: string,
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
      // 更新桌況
      // 建立order
      validateObjectIds({ id, table_id: tableId });
      const updatedReservation = await this.reservationModel.findOneAndUpdate(
        { _id: id, status: ReservationStatus.WAIT },
        { status: action, table_id: tableId },
      );

      if (!updatedReservation) {
        throw new BadRequestException('找不到此筆預約');
      }
    }
  }
}
