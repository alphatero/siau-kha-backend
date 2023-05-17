import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class ActivitiesMiddleware implements NestMiddleware {
  use(req: any, _: any, next: NextFunction) {
    const reqBody = req.body;
    // 需先判斷 act_product_list 是否為陣列，否則後續「計算類別」判斷會出錯
    if (!Array.isArray(reqBody.act_products_list)) {
      throw new BadRequestException('act_products_list 必須為陣列');
    }

    // 判斷計算類別
    // 0-全單優惠，且 act_product_list 需要為空陣列
    // 1-指定商品，且 act_product_list 需要有值
    if (reqBody.discount_type === '0') {
      if (reqBody.act_products_list.length > 0) {
        throw new BadRequestException('全單優惠不需要指定商品');
      }
    } else if (reqBody.discount_type === '1') {
      if (reqBody.act_products_list.length === 0) {
        throw new BadRequestException('指定商品優惠活動需要指定商品');
      }
    } else {
      throw new BadRequestException('計算類別只能為 0 或 1');
    }

    // 判斷計算類型
    // 0-折扣：discount 需要有值，且值需介於 1~100 之間
    // 1-折讓：discount 需要有值，且值需要大於0
    if (reqBody.charge_type === '0') {
      if (!reqBody.discount) {
        throw new BadRequestException('折扣類型需要設定折扣');
      }
      if (reqBody.discount < 1 || reqBody.discount > 100) {
        throw new BadRequestException('折扣需介於 1~100 之間');
      }
    } else if (reqBody.charge_type === '1') {
      if (!reqBody.discount) {
        throw new BadRequestException('折讓類型需要設定折讓金額');
      }
      if (reqBody.discount < 1) {
        throw new BadRequestException('折讓金額需大於 0');
      }
    } else {
      throw new BadRequestException('計算類型只能為 0 或 1');
    }

    // 判斷是否為活動期間
    if (reqBody.is_period) {
      const start_time = new Date(reqBody.start_time);
      const end_time = new Date(reqBody.end_time);
      if (end_time < new Date()) {
        throw new BadRequestException('結束時間不能早於現在時間');
      }

      if (end_time < start_time) {
        throw new BadRequestException('結束時間不能早於開始時間');
      }
    }

    next();
  }
}
