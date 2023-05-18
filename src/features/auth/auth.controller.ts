import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserPayload } from './decorators/payload.decorator';
import { IUserPayload } from './models/payload.model';
import { JwtGuard, LocalGuard } from 'src/common/guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @ApiOperation({ summary: '登入' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_account: { type: 'string' },
        user_mima: { type: 'string' },
      },
      required: ['user_account', 'user_mima'],
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
        data: {
          id: '644a6def9a4dcd031e9e3c78',
          user_name: 'Enzo',
          user_account: 'enzokao01',
          user_role: 'admin',
          token: 'JWT',
          exp: 1684483505000,
        },
      },
    },
  })
  @Post('sign-in')
  async signIn(@UserPayload() payload: IUserPayload) {
    await this.userService.updateUserSignInTime(payload.id);
    const user_info = Object.assign(
      {},
      payload,
      this.authService.generateJwt(
        payload as unknown as Record<string, string>,
      ),
    );
    return user_info;
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '檢查 token 是否過期' })
  @Get('check')
  async checkTokenExp(@Req() request) {
    const { user } = request;
    return { hasExpired: false, exp: user.exp };
  }
}
