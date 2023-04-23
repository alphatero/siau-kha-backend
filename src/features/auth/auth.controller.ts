import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './decorators/payload.decorator';
import { IUserPayload } from './models/payload.model';
import { LocalGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const isExist = await this.userService.useExist(username, email);

    if (isExist) {
      throw new ForbiddenException('User already exist');
    }

    const user = await this.userService.createUser(dto);
    const { _id: id } = user;
    return this.authService.generateJwt({ id, username });
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    // return request.user;
    return this.jwtService.sign(payload);
  }
}
