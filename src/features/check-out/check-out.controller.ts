import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { getCheckOutInfoExample } from './apiExample';
import { CheckOutService } from './check-out.service';

// 1. 取得此桌結帳資訊
// 2. 結帳

@ApiTags('Check-Out')
@UseGuards(JwtGuard)
@Controller('check-out')
export class CheckOutController {
  constructor(private readonly checkOutService: CheckOutService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得此桌結帳資訊' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getCheckOutInfoExample,
    },
  })
  @Get('/:id')
  async getCheckOutInfo(@Param('id') id: string) {
    return this.checkOutService.getCheckOutInfo(id);
  }
}
