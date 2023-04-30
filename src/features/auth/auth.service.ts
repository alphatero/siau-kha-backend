import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
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
    const validate_state = {
      user_state: false,
      state_message: '',
      user_info: {} as any,
    };
    try {
      // 取得使用者資訊
      const user = await this.userService.getUser({ user_account });

      // 使用者不存在
      if (!user) {
        validate_state.user_state = false;
        validate_state.state_message = '使用者不存在';
        return validate_state;
      }

      // 使用者存在，進行mima比對
      const pass = await bcrypt.compare(user_mima, user.user_mima);

      // mima不正確，沒通過驗證
      if (!pass) {
        validate_state.user_state = false;
        validate_state.state_message = '密碼不正確';
        return validate_state;
      }

      // 驗證通過，回傳使用者資訊
      validate_state.user_state = true;
      validate_state.state_message = '驗證通過';
      validate_state.user_info = user.toJSON();
      return validate_state;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('資料庫錯誤');
    }
  }

  public generateJwt(payload: Record<string, string>) {
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
