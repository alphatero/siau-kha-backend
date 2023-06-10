import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductList } from '../product-list';

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

  // 計算類型
  // 0-折扣, 1-折讓
  @Prop({
    required: true,
    default: 0,
    enum: ['0', '1'],
  })
  charge_type: string;

  // 最低消費金額
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  min_spend: number;

  // 折扣/折讓數
  @Prop({ type: Number, required: true })
  discount: number;

  // 是否為期間限定
  @Prop({ default: false })
  is_period: boolean;

  @Prop({ required: false })
  start_time: Date;

  @Prop({ required: false })
  end_time: Date;

  @Prop({
    type: [Types.ObjectId],
    ref: 'ProductList',
  })
  act_products_list: ProductList[];

  @Prop()
  create_time: Date;

  // 控制活動開始與否
  @Prop({ default: true })
  status: boolean;

  @Prop({ default: false })
  is_delete: boolean;
}

export const ActivitiesSchema = SchemaFactory.createForClass(Activities);
