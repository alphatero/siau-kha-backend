import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserPayload } from '../models/payload.model';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // 從 request header bearer 中取得 Bearer 型式的 token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 對過期做驗證，但如果要自定義過期錯誤處理，則設定true，並在validate中自行處理
      ignoreExpiration: true,
      // 從 config 中取得 secret，並指定回傳類型為 string
      secretOrKey: configService.get<string>('secrets.jwt'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: IUserPayload) {
    // 檢查 JWT 是否在黑名單中
    const jwt = req.headers['authorization'].split(' ')[1];
    const isTokenBlacklisted = await this.authService.findTokenInBlackList(jwt);

    if (isTokenBlacklisted) {
      throw new UnauthorizedException('token 已註銷');
    }

    const now = Date.now();
    // 驗證 token 是否過期
    if (now > payload.exp * 1000) {
      throw new UnauthorizedException('token 已過期');
    }
    return payload;
  }
}
