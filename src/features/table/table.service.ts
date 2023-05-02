import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { TableMain, TableMainDocument } from 'src/core/models/table-main';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(TableMain.name)
    private readonly tableMainModel: Model<TableMainDocument>,
  ) {}

  public async createTable(dto: CreateTableDto) {
    return this.tableMainModel.create(dto);
  }
  public async getTableList(filters?: FilterQuery<TableMain>) {
    const query = this.tableMainModel.find(filters);
    return query;
  }
}
