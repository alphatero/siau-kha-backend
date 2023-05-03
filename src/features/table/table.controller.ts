import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';

@ApiTags('Table')
@UseGuards(JwtGuard)
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiBearerAuth()
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
