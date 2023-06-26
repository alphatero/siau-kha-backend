import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { formatDateTime } from 'src/common/utils/time';
import { getTableListExample } from './apiExample';
import { basicExample } from 'src/common/utils/apiExample';

@ApiTags('Table')
@UseGuards(JwtGuard)
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '取得所有桌況' })
  @ApiResponse({
    status: 200,
    schema: {
      example: getTableListExample,
    },
  })
  @Get('/list')
  async getTableList() {
    const documents = await this.tableService.getTableList();
    const table_list = documents.map((doc) => {
      const table = doc.toJSON();
      const order_detail = table.order?.order_detail.map((order_detail) => {
        return order_detail.product_detail.map((p) => {
          return {
            order_detail_id: order_detail['_id'],
            id: p['_id'],
            product_name: p.product_name,
            product_quantity: p.product_quantity,
            product_note: p.product_note,
            status: p.status,
            is_delete: p.is_delete,
            order_time: formatDateTime(order_detail.create_time),
          };
        });
      });
      return {
        id: table._id,
        table_name: table.table_name,
        seat_max: table.seat_max,
        status: table.status,
        customer_num: table.order?.customer_num,
        create_time: table.order?.create_time,
        is_pay: table.order?.is_pay,
        order_id: table.order ? table.order['_id'] : '',
        order_detail,
      };
    });
    return { table_list };
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @Post()
  async createTable(@Body() dto: CreateTableDto) {
    return await this.tableService.createTable(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '更新桌況 - 安排入座 / 清潔完成' })
  @ApiResponse({
    status: 200,
    schema: {
      example: basicExample,
    },
  })
  @Patch('/:id')
  async updateTable(
    @Req() request,
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
  ) {
    const { user } = request;
    await this.tableService.updateTable(id, dto, user);
  }
}
