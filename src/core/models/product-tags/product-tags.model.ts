import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user';
import { ProductTagStatus } from './product-tags.type';

export type ProductTagsDocument = ProductTags & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'set_state_time',
  },
  versionKey: false,
})
export class ProductTags {
  // 類別名稱
  @Prop({ required: true })
  tag_name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  create_user: User;

  @Prop()
  create_time: Date;

  @Prop({
    required: true,
    enum: Object.values(ProductTagStatus),
    default: ProductTagStatus.ENABLE,
  })
  status: ProductTagStatus;

  // 改變狀態的時間
  @Prop()
  set_state_time: Date;

  // 改變狀態的封存者
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  set_state_user: User;

  // 排序
  @Prop({
    type: Number,
  })
  sort_no: number;
}

export const ProductTagsSchema = SchemaFactory.createForClass(ProductTags);
