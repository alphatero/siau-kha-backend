import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlackListDocument = BlackList & Document;

// 點餐紀錄
@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class BlackList {
  @Prop({ required: true })
  token: string;

  @Prop()
  create_time: Date;
}

export const BlackListSchema = SchemaFactory.createForClass(BlackList);
