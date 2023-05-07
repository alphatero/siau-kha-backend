import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/common/guards';
import {
  ApiTags,
  ApiExcludeEndpoint,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiExcludeEndpoint()
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { user_account } = dto;
    const isExist = await this.userService.useExist(user_account);
    if (isExist) throw new ConflictException();
    const document = await this.userService.createUser(dto);
    const user = document.toJSON();
    user.user_mima = null;
    return user;
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const document = await this.userService.updateUser(id, dto);
    return document.toJSON();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有使用者' })
  @Get()
  async getUsers() {
    const documents = await this.userService.getUsers();
    const users = documents.map((doc) => {
      const user = doc.toJSON();
      user.user_mima = null;
      return user;
    });
    return users;
  }

  // 隱藏此API不要出現在Swagger上
  @ApiExcludeEndpoint()
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const document = await this.userService.deleteUser(id);
    return document.toJSON();
  }
}
