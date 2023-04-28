import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './models/payload.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 驗證使用者
   * @param user_account
   * @param user_mima
   * @returns
   */
  public async validateUser(user_account: string, user_mima: string) {
    // 取得使用者資訊
    const user = await this.userService.getUser({ user_account });

    // 使用者不存在
    if (!user) return null;

    // 使用者存在，進行mima比對
    const pass = await bcrypt.compare(user_mima, user.user_mima);

    // mima不正確，沒通過驗證
    if (!pass) return null;

    // 驗證通過，回傳使用者資訊
    return user.toJSON();
  }

  public generateJwt(payload: IUserPayload) {
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
