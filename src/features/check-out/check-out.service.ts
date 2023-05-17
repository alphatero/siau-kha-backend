import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities } from 'src/core/models/activities';
import { Order } from 'src/core/models/order';
import { OrderDetail } from 'src/core/models/order-detail';

@Injectable()
export class CheckOutService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @InjectModel(OrderDetail.name)
    private readonly orderDetailModel: Model<OrderDetail>,
    @InjectModel(Activities.name)
    private readonly activitiesModel: Model<Activities>,
  ) {}

  public async getCheckOutInfo(id: string) {
    console.log(id);
    console.log('getCheckOutInfo');
    // 1. [v] 判斷id是否為有效的ObjectId。
    // 2. [] 透過id查詢訂單資訊。
    // 3. [] 透過訂單資訊中的activities欄位，取得優惠活動資訊。
    // 4. [] 透過訂單資訊中的order_details欄位，取得訂單明細資訊。
    // 5. [] 計算訂單總金額。
    // 6. [] 回傳前端需要的資訊。
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }

    const order = await this.orderModel
      .findById(id)
      .populate({
        path: 'order_detail',
        select: 'product_name product_price product_quantity -_id', // 在此选择您需要的字段
      })
      .populate('activities');

    console.log(order);
  }
}
