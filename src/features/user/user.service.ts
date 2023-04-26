import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import * as flatten from 'flat';
import * as bcrypt from 'bcrypt';

import { Role, User, UserDocument } from 'src/core/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onApplicationBootstrap() {
    // 在系統啟動時，建立預設管理員帳號
    // await this.createDefaultAdmin();
  }

  public async createUser(dto: CreateUserDto) {
    const { password } = dto;
    const hash = await bcrypt.hash(password, 12);
    return this.userModel.create({ ...dto, password: hash });
  }

  // 建立初始管理員帳號
  public async createDefaultAdmin() {
    const { username, password, email } = this.configService.get('admin');

    const dto: CreateUserDto = {
      username,
      password,
      email,
      role: Role.ADMIN,
    };

    const exist = await this.userModel
      .exists({
        $and: [{ username }, { role: Role.ADMIN }],
      })
      .exec();

    if (exist) return null;

    await this.createUser(dto);
  }

  public useExist(username: string, email: string) {
    return this.userModel.exists({ $or: [{ username }, { email }] });
  }

  public updateUser(id: string, dto: UpdateUserDto) {
    const obj = flatten(dto);
    // return this.userModel.findByIdAndUpdate(id, dto, { new: true });
    return this.userModel.findByIdAndUpdate(id, { $set: obj }, { new: true });
  }

  public async getUser(filters: FilterQuery<UserDocument>) {
    const result = await this.userModel.findOne(filters).exec();
    console.log('this.userModel', this.userModel);
    console.log('result', result);
    console.log('filters', filters);
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
