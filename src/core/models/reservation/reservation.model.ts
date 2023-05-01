import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user';
import { ReservationStatus } from './reservation.type';

export type ReservationDocument = Reservation & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class Reservation {
  // 顧客姓名
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  // 用餐人數
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  customer_num: number;

  @Prop({
    required: true,
    enum: Object.values(ReservationStatus),
  })
  status: ReservationStatus;

  // 建立者(櫃台 ID)
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop()
  create_time: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
