import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
  ReservationStatus,
} from 'src/core/models/reservation';
import { CreateReservationDto } from './dto/check-in-reservation.dto';
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
    const query = this.reservationModel
      .find({
        status: ReservationStatus.WAIT,
      })
      .sort({ create_time: 1 });
    return query;
  }

  public async changeReservationStatus(id: string, action: ReservationStatus) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('tag_id 格式錯誤');
    }

    const updatedReservation = await this.reservationModel.findOneAndUpdate(
      { _id: id, status: ReservationStatus.WAIT },
      { status: action },
    );

    if (!updatedReservation) {
      throw new BadRequestException('找不到此筆預約');
    }
  }
}
