import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../order/order.model';
import { ProductDetail } from '../product-detail/product-detail.model';
import { User } from '../user';

export type OrderDetailDocument = OrderDetail & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  },
  versionKey: false,
})
export class OrderDetail {
  @Prop({
    type: Types.ObjectId,
    ref: 'order',
    required: true,
  })
  order: Order;

  @Prop({
    type: [Types.ObjectId],
    ref: 'ProductDetail',
    required: true,
  })
  product_detail: ProductDetail[];

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  total: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop()
  create_time: Date;

  @Prop()
  update_time: Date;
}

const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

OrderDetailSchema.pre(/^find/, function (next) {
  this.populate('product_detail');
  next();
});

export { OrderDetailSchema };
