import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from 'src/common/guards';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

import { getOrderDetailExample } from './apiExample';
import { basicExample } from 'src/common/utils/apiExample';
import { ProductDetailStatus } from 'src/core/models/product-detail';

// B-10 送出餐點紀錄
@ApiTags('OrderDetail')
@UseGuards(JwtGuard)
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '送出餐點紀錄' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Post('/:order_id')
  async postOrderDetail(
    @Param('order_id') orderId: string,
    @Body() orderDetail: CreateOrderDetailDto,
  ) {
    await this.orderDetailService.orderFlow(orderDetail, orderId);
  }

  // B-8 單一餐點上菜
  @ApiBearerAuth()
  @ApiOperation({ summary: '單一餐點上菜' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/:order_id/:detail_id/:p_id')
  async patchOrderDetail(
    @Param('order_id') orderId: string,
    @Param('detail_id') detailId: string,
    @Param('p_id') pId: string,
  ) {
    await this.orderDetailService.patchOrderDetail(
      orderId,
      detailId,
      pId,
      ProductDetailStatus.SUCCESS,
    );
  }

  // B-7 單一餐點退點
  @ApiBearerAuth()
  @ApiOperation({ summary: '單一餐點退點' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Delete('/:order_id/:detail_id/:p_id')
  async deleteOrderDetail(
    @Param('order_id') orderId: string,
    @Param('detail_id') detailId: string,
    @Param('p_id') pId: string,
  ) {
    await this.orderDetailService.deleteOrderDetail(orderId, detailId, pId);
  }

  // B-6 取得此桌訂單紀錄
  @ApiBearerAuth()
  @ApiOperation({ summary: '取得此桌訂單紀錄' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getOrderDetailExample,
    },
  })
  @Get('')
  async getOrderDetail(@Query('id') id: string) {
    return await this.orderDetailService.getOrderDetail(id);
  }
}
