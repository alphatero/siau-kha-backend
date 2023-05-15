import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { OrderService } from './order.service';

@ApiTags('Order')
@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '新增訂單優惠活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
      },
    },
  })
  @Post('/:order_id/:a_id')
  async createOrderActivities(
    @Param('order_id') order_id: string,
    @Param('a_id') a_id: string,
  ) {
    await this.orderService.updateOrderActivities(order_id, a_id, 'CREATE');
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '刪除訂單優惠活動' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
      },
    },
  })
  @Delete('/:order_id/:a_id')
  async deleteOrderActivities(
    @Param('order_id') order_id: string,
    @Param('a_id') a_id: string,
  ) {
    await this.orderService.updateOrderActivities(order_id, a_id, 'DELETE');
  }
}
