import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
} from './user.const';
import { Role } from './user.type';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'updated_time',
  },
  versionKey: false,
})
export class User {
  // 使用者帳號
  @Prop({
    min: USER_USERNAME_MIN_LENGTH,
    max: USER_USERNAME_MAX_LENGTH,
    required: true,
  })
  user_account: string;

  // 使用者mima
  @Prop({
    required: true,
  })
  user_mima: string;

  // 使用者名稱
  @Prop({
    min: USER_USERNAME_MIN_LENGTH,
    max: USER_USERNAME_MAX_LENGTH,
    required: true,
  })
  user_name: string;

  @Prop({
    required: true,
    enum: Object.values(Role),
  })
  user_role: Role;

  @Prop()
  create_time: Date;

  @Prop()
  updated_time: Date;

  @Prop({ default: false })
  is_blocked: boolean;

  @Prop()
  set_blocked_time: Date;

  @Prop()
  last_sign_in_time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
