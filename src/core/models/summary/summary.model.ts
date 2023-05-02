import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user';

export type SummaryDocument = Summary & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class Summary {
  // 現金交易額
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  cash: number;

  // 其他交易額
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  other: number;

  // 預留現金
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  reserve_cash: number;

  @Prop()
  create_time: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
