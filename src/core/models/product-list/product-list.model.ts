import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductTags } from '../product-tags';
import { User } from '../user';
import { FoodConsumption, ProductNote } from './product-list.type';

export type ProductListDocument = ProductList & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'set_state_time',
  },
  versionKey: false,
})
export class ProductList {
  // 商品名稱
  @Prop({ required: true })
  product_name: string;

  // 商品類型
  // 0:單一商品, 1:套餐
  @Prop({
    required: true,
    enum: [0, 1],
  })
  product_type: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'ProductTags',
  })
  product_tags: ProductTags;

  @Prop()
  product_image: string;

  @Prop({
    type: Number,
    required: true,
  })
  product_price: number;

  @Prop()
  product_note: Array<ProductNote>;

  // 食材消耗
  @Prop()
  food_consumption_list: Array<FoodConsumption>;

  @Prop()
  create_time: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop({ default: false })
  is_delete: boolean;

  // 改變狀態的時間
  @Prop()
  set_state_time: Date;

  // 改變狀態的封存者
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  set_state_user: User;
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
