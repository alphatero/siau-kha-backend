import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../order/order.model';
import { TableStatus } from './table-main.type';

export type TableMainDocument = TableMain & Document;

@Schema({
  versionKey: false,
})
export class TableMain {
  @Prop({ required: true })
  table_name: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  seat_max: number;

  @Prop({
    required: true,
    enum: Object.values(TableStatus),
  })
  status: TableStatus;

  @Prop({ default: false })
  is_delete: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: false,
  })
  order: Order;
}

const TableMainSchema = SchemaFactory.createForClass(TableMain);

TableMainSchema.pre(/^find/, function (next) {
  this.populate('order');
  next();
});

export { TableMainSchema };
