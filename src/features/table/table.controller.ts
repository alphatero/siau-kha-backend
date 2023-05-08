import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
      example: {
        status: 'success',
        message: '成功',
        data: {
          table_list: [
            {
              id: '644e543b893f163f3a3678f6',
              table_name: 'TA 1',
              seat_max: 0,
              status: 'MEAL',
              customer_num: 3,
              create_time: '2023-04-30T16:00:00.000Z',
              is_pay: false,
            },
            {
              id: '644e54a6893f163f3a3678f8',
              table_name: 'TA 2',
              seat_max: 0,
              status: 'IDLE',
            },
          ],
        },
      },
    },
  })
  @Get('/list')
  async getTableList() {
    const documents = await this.tableService.getTableList();
    const table_list = documents.map((doc) => {
      const table = doc.toJSON();
      return {
        id: table._id,
        table_name: table.table_name,
        seat_max: table.seat_max,
        status: table.status,
        customer_num: table.order?.customer_num,
        create_time: table.order?.create_time,
        is_pay: table.order?.is_pay,
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
}
