import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from 'src/common/guards';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

@ApiTags('OrderDetail')
@UseGuards(JwtGuard)
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '新增訂單明細' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: '成功',
        data: {
          order: '644e5571020c9409fe694db5',
          product_detail: ['645be06607b72ad4a95c1f53'],
          total: 2200,
          status: 'IN_PROGRESS',
          create_user: '644b1c251bdbf1f010dddaf9',
          _id: '645be06707b72ad4a95c1f59',
          create_time: '2023-05-10T18:20:23.425Z',
          updatedAt: '2023-05-10T18:20:23.425Z',
        },
      },
    },
  })
  @Post('/:order_id')
  async postOrderDetail(
    @Param('order_id') orderId: string,
    @Body() orderDetail: CreateOrderDetailDto,
  ) {
    return await this.orderDetailService.OrderFlow(orderDetail, orderId);
  }
}
