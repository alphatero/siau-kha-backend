import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductDetailStatus } from './product-detail.type';

export type ProductDetailDocument = ProductDetail & Document;

// 點餐紀錄
@Schema({ versionKey: false })
export class ProductDetail {
  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  product_name: string;

  @Prop({
    type: Number,
    required: true,
  })
  product_price: number;

  @Prop({
    type: Number,
    required: true,
  })
  product_quantity: number;

  @Prop({
    type: Array<string>,
  })
  product_note: Array<string>;

  @Prop({
    type: Number,
    required: true,
  })
  product_final_price: number;

  @Prop({
    required: true,
    enum: Object.values(ProductDetailStatus),
  })
  status: ProductDetailStatus;

  // 是否退點
  @Prop({ default: false })
  is_delete: boolean;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
