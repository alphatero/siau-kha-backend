import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivitiesDocument = Activities & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class Activities {
  @Prop({ required: true })
  activities_name: string;

  // 計算類別
  // 0-全單優惠, 1-指定商品
  @Prop({
    required: true,
    default: 1,
    enum: ['0', '1'],
  })
  discount_type: string;

  // 最低消費金額
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  min_spend: number;

  // 計算類型
  // 0-折扣, 1-折讓
  @Prop({
    required: true,
    default: 0,
    enum: ['0', '1'],
  })
  charge_type: string;

  // 是否為期間限定
  @Prop({ default: false })
  is_period: boolean;

  @Prop({ required: true })
  start_time: Date;

  @Prop({ required: true })
  end_time: Date;

  @Prop()
  create_time: Date;

  // 控制活動開始與否
  @Prop({ default: true })
  status: boolean;

  @Prop({ default: false })
  is_delete: boolean;
}

export const ActivitiesSchema = SchemaFactory.createForClass(Activities);
