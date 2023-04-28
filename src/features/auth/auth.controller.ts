import {
  Controller,
  Post,
  UseGuards,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserPayload } from './decorators/payload.decorator';
import { IUserPayload } from './models/payload.model';
import { LocalGuard } from 'src/common/guards';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors';

@ApiTags('auth')
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
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload, @Response() res) {
    const user_info = Object.assign(
      {},
      payload,
      this.authService.generateJwt(payload),
    );
    return res.send({
      status: 'Success',
      message: '成功',
      data: user_info,
    });
  }
}
