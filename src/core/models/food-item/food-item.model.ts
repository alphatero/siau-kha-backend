import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user';
import { FoodItemsStatus } from './food-item.type';

export type FoodItemDocument = FoodItem & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class FoodItem {
  // 商品名稱
  @Prop({ required: true })
  food_items_name: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'FoodGroup',
  })
  group: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  purchase_cost: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  item_stock: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  safety_stock: number;

  @Prop({
    required: true,
    default: '0',
    enum: Object.values(FoodItemsStatus),
  })
  status: string;

  @Prop({
    required: true,
    default: '斤',
  })
  units: string;

  @Prop()
  create_time: Date;

  // 建立者(櫃台 ID)
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop({ default: false })
  is_delete: boolean;
}

const FoodItemSchema = SchemaFactory.createForClass(FoodItem);

FoodItemSchema.pre(/^find/, function (next) {
  this.populate('group');
  next();
});

export { FoodItemSchema };
