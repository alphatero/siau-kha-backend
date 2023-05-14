import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
import { Order, OrderDocument } from 'src/core/models/order';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Activities.name)
    private readonly activitiesModel: Model<ActivitiesDocument>,
  ) {}

  public async updateOrderActivities(
    order_id: string,
    a_id: string,
    operate_type: 'CREATE' | 'DELETE',
  ) {
    if (!Types.ObjectId.isValid(order_id)) {
      throw new BadRequestException('order_id 格式錯誤');
    }

    if (!Types.ObjectId.isValid(a_id)) {
      throw new BadRequestException('a_id 格式錯誤');
    }

    const order = await this.orderModel.findById(order_id).exec();
    if (!order) {
      throw new BadRequestException('找不到此筆訂單');
    }

    if (operate_type === 'DELETE' && !order.activities) {
      throw new BadRequestException('此訂單無加入優惠活動');
    }

    const activities = await this.activitiesModel.findById(a_id).exec();
    if (!activities) {
      throw new BadRequestException('找不到此優惠活動');
    }

    if (operate_type === 'CREATE') {
      return await this.orderModel.findByIdAndUpdate(order_id, {
        activities: new Types.ObjectId(a_id),
      });
    } else if (operate_type === 'DELETE') {
      const check_id = order.activities['_id'] as Types.ObjectId;
      if (check_id.toString() !== a_id) {
        throw new BadRequestException(
          '此訂單目前選擇的優惠活動與欲刪除的活動不同',
        );
      }
      return await this.orderModel.findByIdAndUpdate(order_id, {
        $unset: { activities: '' },
      });
    }
  }
}
