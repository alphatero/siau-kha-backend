import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from 'src/core/models/order';
import {
  TableMain,
  TableMainDocument,
  TableStatus,
} from 'src/core/models/table-main';
import { IUserPayload } from '../auth';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(TableMain.name)
    private readonly tableMainModel: Model<TableMainDocument>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  public async createTable(dto: CreateTableDto) {
    return this.tableMainModel.create(dto);
  }
  public async getTableList(filters?: FilterQuery<TableMain>) {
    const query = this.tableMainModel.find(filters);
    return query;
  }

  public async updateTable(
    id: string,
    dto: UpdateTableDto,
    user: IUserPayload,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }

    const table_main = await this.tableMainModel.findById(id).exec();
    if (!table_main || table_main.is_delete) {
      throw new BadRequestException('找不到此桌號');
    }

    switch (dto.status) {
      case TableStatus.MEAL:
        if (dto.customer_num <= 0)
          throw new BadRequestException('安排入座, 用餐人數須大於0');
        else if (dto.customer_num > table_main.seat_max + 2)
          throw new BadRequestException(
            `預設可容納人數為 ${table_main.seat_max}, 實際人數可超過「預設可容納人數」最多兩位`,
          );
        else if (table_main.status === TableStatus.MEAL)
          throw new BadRequestException('此桌次為用餐中, 無法安排入座');
        break;

      case TableStatus.IDLE:
        if (dto.customer_num !== 0)
          throw new BadRequestException('清潔完成, 人數須為 0');
        break;
    }

    const tableSession = await this.tableMainModel.db.startSession();
    const orderSession = await this.orderModel.db.startSession();
    tableSession.startTransaction();
    orderSession.startTransaction();
    try {
      if (dto.status === TableStatus.MEAL) {
        // 1. 安排入座
        // 建立訂單
        const createdOrder: OrderDocument[] = await this.orderModel.create(
          [
            {
              table_main: new Types.ObjectId(id),
              customer_num: dto.customer_num,
              status: OrderStatus.IN_PROGRESS,
              create_user: new Types.ObjectId(user.id),
            },
          ],
          {
            session: orderSession,
          },
        );
        // 更新桌位
        await this.tableMainModel.findByIdAndUpdate(
          id,
          {
            status: TableStatus.MEAL,
            order: new Types.ObjectId(createdOrder[0]._id),
          },
          {
            session: tableSession,
          },
        );
      } else if (dto.status === TableStatus.IDLE) {
        // 2. 清潔完成
        // 更新訂單狀態
        await this.orderModel.findByIdAndUpdate(
          table_main.order,
          {
            status: OrderStatus.SUCCESS,
          },
          {
            session: tableSession,
          },
        );

        // 釋出桌次
        await this.tableMainModel.findByIdAndUpdate(
          id,
          {
            status: TableStatus.IDLE,
            $unset: { order: '' },
          },
          {
            session: tableSession,
          },
        );
      }
      await tableSession.commitTransaction();
      await orderSession.commitTransaction();
    } catch (error) {
      await tableSession.abortTransaction();
      await orderSession.abortTransaction();
      throw error;
    } finally {
      tableSession.endSession();
      orderSession.endSession();
    }
  }
}
