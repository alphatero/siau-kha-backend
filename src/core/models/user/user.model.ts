import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
} from './user.const';
import { isEmail } from 'class-validator';
import { Role } from './user.type';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    min: USER_USERNAME_MIN_LENGTH,
    max: USER_USERNAME_MAX_LENGTH,
    required: true,
  })
  username: string;

  @Prop({
    validate: {
      validator: (input: string) => isEmail(input),
    },
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    enum: Object.values(Role),
    default: Role.STAFF,
  })
  role: Role;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
