import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import * as flatten from 'flat';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/core/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const { user_mima } = dto;
    const hash = await bcrypt.hash(user_mima, 12);
    return this.userModel.create({ ...dto, user_mima: hash });
  }

  public useExist(user_account: string) {
    return this.userModel.exists({ $or: [{ user_account }] });
  }

  public updateUser(id: string, dto: UpdateUserDto) {
    const obj = flatten(dto);
    return this.userModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
  }

  public updateUserSignInTime(id: string) {
    const lastSignInTime = new Date();
    return this.userModel.findByIdAndUpdate(id, {
      $set: { last_sign_in_time: lastSignInTime },
    });
  }

  public async getUser(filters: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filters).exec();
  }

  public getUsers(filters?: FilterQuery<UserDocument>) {
    const query = this.userModel.find(filters);
    return query.exec();
  }

  public deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
