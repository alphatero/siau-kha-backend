import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Activities } from '../activities';
import { OrderDetail } from '../order-detail/order-detail.model';
import { TableMain } from '../table-main';
import { User } from '../user';
import { OrderStatus } from './order.type';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'updated_time',
  },
  versionKey: false,
})
export class Order {
  @Prop({
    type: Types.ObjectId,
    ref: 'TableMain',
    required: true,
  })
  table_main: TableMain;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  customer_num: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  total: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  final_total: number;

  @Prop({ default: false })
  is_pay: boolean;

  @Prop({
    required: true,
    enum: Object.values(OrderStatus),
  })
  status: OrderStatus;

  // 建立者(櫃台 ID)
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop()
  create_time: Date;

  @Prop()
  updated_time: Date;

  @Prop({
    type: [Types.ObjectId],
    ref: 'OrderDetail',
  })
  order_detail: OrderDetail;

  @Prop({
    type: Types.ObjectId,
    ref: 'Activities',
  })
  activities: Activities;
}

const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre(/^find/, function (next) {
  this.populate('order_detail').populate('activities');
  next();
});

export { OrderSchema };
