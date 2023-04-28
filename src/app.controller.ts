import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';

@Controller()
export class AppController {
  @ApiTags('Global Test')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  getHello(): any {
    return {
      message: 'Hello World!',
    };
  }
}
