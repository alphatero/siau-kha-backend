import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

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
  async validate(user_account = '', user_mima = '') {
    // 先執行mima驗證，所以這裡會呼叫AuthService的validateUser方法
    const validate_result = await this.authService.validateUser(
      user_account,
      user_mima,
    );
    // 未通過驗證，拋出例外
    if (!validate_result.user_state) {
      if (validate_result.state_message === '使用者不存在') {
        throw new UnauthorizedException('使用者不存在');
      }
      if (validate_result.state_message === '密碼不正確') {
        throw new UnauthorizedException('密碼不正確');
      }
    }

    const payload = {
      id: validate_result.user_info._id,
      user_name: validate_result.user_info.user_name,
      user_account: validate_result.user_info.user_account,
      user_role: validate_result.user_info.user_role,
    };

    return payload;
  }
}
