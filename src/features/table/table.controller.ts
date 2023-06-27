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
    const table_list = await this.tableService.getTableList();
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
