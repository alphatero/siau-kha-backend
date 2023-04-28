import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import * as flatten from 'flat';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'src/core/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap() {
    // 此函式目的是讓開發者在應用程式啟動完成後可以執行額外的初始化任務或操作
  }

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

  public async getUser(filters: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filters).exec();
  }

  public getUsers(skip = 0, limit = 30, filters?: FilterQuery<UserDocument>) {
    const query = this.userModel.find(filters).skip(skip).limit(limit);
    return query.exec();
  }

  public deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
