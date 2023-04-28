import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IUserPayload } from '../models/payload.model';

// PassportStrategy 第二個參數為策略名稱，如果沒輸入的話，會將第一個參數的名稱當作策略名稱
// AuthGuard 要使用此策略的舉例：AuthGuard('local')
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'user_account', passwordField: 'user_mima' });
  }

  /**
   * 當使用 AuthGuard 來幫助我們進入 Passport 的流程，而 validate 會當作整個流程的進入點，所以我們會在這裡進行使用者的驗證。
   * @param user_account
   * @param user_mima
   * @returns
   */
  async validate(user_account: string, user_mima: string) {
    // 先執行mima驗證，所以這裡會呼叫AuthService的validateUser方法
    const user = await this.authService.validateUser(user_account, user_mima);

    // 未通過驗證，拋出例外
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: IUserPayload = {
      id: user._id,
      user_name: user.user_name,
      user_account: user.user_account,
      user_role: user.user_role,
    };

    return payload;
  }
}
