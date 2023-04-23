import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  Delete,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard, RoleGuard } from 'src/common/guards';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const isExist = await this.userService.useExist(username, email);
    if (isExist) throw new ConflictException();
    const document = await this.userService.createUser(dto);
    const user = document.toJSON();
    user.password = null;

    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const document = await this.userService.updateUser(id, dto);
    return document.toJSON();
  }

  // @Get(':id')
  // async getUser(@Param('id') id: string) {
  //   const document = await this.userService.getUser(id);
  //   return document.toJSON();
  // }

  @Get()
  async getUsers(@Query('skip') skip: number, @Query('limit') limit: number) {
    const documents = await this.userService.getUsers(skip, limit);
    const users = documents.map((doc) => {
      const user = doc.toJSON();
      user.password = null;
      return user;
    });
    return users;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const document = await this.userService.deleteUser(id);
    return document.toJSON();
  }
}
