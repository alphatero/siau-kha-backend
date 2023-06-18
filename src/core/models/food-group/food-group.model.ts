import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodGroupDocument = FoodGroup & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
  },
  versionKey: false,
})
export class FoodGroup {
  @Prop({ required: true })
  group_name: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_delete: boolean;

  @Prop()
  create_time: Date;
}

const FoodGroupSchema = SchemaFactory.createForClass(FoodGroup);

export { FoodGroupSchema };
