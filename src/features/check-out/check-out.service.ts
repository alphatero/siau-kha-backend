import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderStatus } from 'src/core/models/order';

@Injectable()
export class CheckOutService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  public async checkOut(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }

    const orderRes = await this.orderModel.findById(id);

    if (!orderRes) {
      throw new BadRequestException('無此訂單');
    }

    if (orderRes.status === OrderStatus.SUCCESS) {
      throw new BadRequestException('此桌訂單已清理完成,並釋出桌位');
    }

    if (orderRes.is_pay) {
      throw new BadRequestException('此訂單已結帳');
    }

    await this.orderModel.findByIdAndUpdate(
      id,
      { is_pay: true },
      { new: true },
    );
  }

  public async getCheckOutInfo(id: string) {
    // 1. [v] 判斷id是否為有效的ObjectId。
    // 2. [v] 透過id查詢訂單資訊。
    // 3. [v] 確認是否有此訂單。
    // 4. [v] 確認此定單狀態
    //        a. [v] status = OrderStatus.IN_PROGRESS (已清理完成,並釋出桌位)。
    //        b. [v] 確認此定單 is_pay = false (尚未結帳)。
    // 5. [v] 透過訂單資訊中的order_details欄位，取得訂單明細資訊。
    // 6. [v] 判斷訂單明細資訊是否為空。
    // 7. [v] 透過訂單明細資訊中的product_detail欄位，取得餐點資訊。
    // 8. [v] 整理有效的 order_detail，order_detail.status === OrderDetailStatus.SUCCESS (已送出的訂單)
    // 9. [v] 整理所有有效的餐點
    //       a.[v] 計算每筆 order_detail 的總額加總，用來做應收金額的參考。
    //       b.[v] 整理有效餐點，及有效餐點應收金額，product_detail.status = ProductDetailStatus.SUCCESS (已上菜  -> for demo 移除卡控)、product_detail.is_delete = false。(未被退點)。
    // 10.[v] 透過第2點的訂單資訊中的activities欄位，取得優惠活動資訊。
    // 11.[v] 判斷 計算類別 discount_type 0-全單優惠 1-指定商品。
    // 12.[v] 如果 計算類別為 1-指定商品 則需確認點餐清單內有該商品。
    // 13.[v] 確認 計算類型 charge_type 0-折扣 1-折讓
    // 14.[v] 依照計算類別及計算類型來計算訂單總金額。
    // 15.[v] 訂單總金額寫回order 作為結帳時檢查用
    // 16.[v] 回傳前端需要的資訊。
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }

    const orderRes = await this.orderModel.findById(id);

    if (!orderRes) {
      throw new BadRequestException('查無此訂單');
    }

    if (orderRes.status !== OrderStatus.IN_PROGRESS) {
      throw new BadRequestException('此桌訂單已清理完成,並釋出桌位');
    }

    if (orderRes.is_pay) {
      throw new BadRequestException('此訂單已結帳');
    }

    if (orderRes.order_detail.length === 0) {
      throw new BadRequestException('此訂單沒有可以結帳的訂單項目');
    }

    const productListObj = {}; // 存放所有有效的餐點，以 product_id 為 key
    //let orderDetailTotal = 0;
    let validTotal = 0;
    let finalTotal = 0;

    orderRes.order_detail.forEach((detail) => {
      // order_detail 裡的 total 更新時間是建立時就寫入
      // 但 product_detail 裡 status = ProductDetailStatus.SUCCESS (已上菜) 才算是能收錢的有效餐點 -> for demo 移除卡控
      // 所以 order_detail 裡的 total 目前先當作參考
      // orderDetailTotal = orderDetailTotal + detail.total;

      detail.product_detail.forEach((product) => {
        if (
          // ProductDetailStatus.SUCCESS (已上菜)
          // is_delete = false。(未被退點)
          // product.status === ProductDetailStatus.SUCCESS &&
          product.is_delete === false
        ) {
          // 用 product_id 做key，來合併計算相同餐點的數量及總額
          if (productListObj[product.product_id]) {
            productListObj[product.product_id].product_quantity =
              productListObj[product.product_id].product_quantity +
              product.product_quantity;
            productListObj[product.product_id].product_price =
              product.product_price;
          } else {
            productListObj[product.product_id] = {
              product_name: product.product_name,
              product_price: product.product_price,
              product_quantity: product.product_quantity,
            };
          }
        }
      });
    });

    const order_detail_list = Object.values(productListObj).map(
      (product: any) => {
        const { product_name, product_price, product_quantity } = product;
        const product_final_price = product_price * product_quantity;
        validTotal = validTotal + product_final_price;
        return {
          product_name,
          product_price,
          product_quantity,
          product_final_price,
        };
      },
    );
    // 如果有折扣，則計算折扣後的金額
    if (orderRes.activities) {
      finalTotal = this.calActivityDiscount(
        productListObj,
        validTotal,
        orderRes.activities, // merge 前要改成 order.activities；如果要測試計算邏輯，可以使用下方test Data(從 ./testData 引入使用)，這樣可以不用一直改db
        // testActivityDataList[0], // 測試全單折扣20%(8折)優惠活動
        // testActivityDataList[1], // 測試全單折讓300元優惠活動
        // testActivityDataList[2], // 經典霜降牛套餐折讓300元優惠活動
        // testActivityDataList[3], // 測試經典霜降牛套餐折扣20%(8折)優惠活動
      );
    } else {
      finalTotal = validTotal;
    }

    const activity_charge = finalTotal - validTotal;
    const service_charge = finalTotal * 0.1;
    finalTotal = finalTotal + service_charge;

    await this.orderModel
      .findByIdAndUpdate(id, { final_total: finalTotal }, { new: true })
      .exec();
    const order = {
      customer_num: orderRes.customer_num,
      total: validTotal,
      final_total: finalTotal,
      service_charge: service_charge,
      order_detail: order_detail_list,
      activities: orderRes.activities
        ? {
            activities_name: orderRes.activities.activities_name,
            discount_type: orderRes.activities.discount_type,
            charge_type: orderRes.activities.charge_type,
            activity_charge: activity_charge,
          }
        : {},
    };

    return { order };
  }

  private calActivityDiscount(validObj, validTotal, activities) {
    let finalTotal = 0;
    // 判斷 計算類別 discount_type 0-全單優惠 1-指定商品。
    switch (activities.discount_type) {
      case '0': // 0-全單優惠
        // 確認 計算類型 charge_type 0-折扣 1-折讓
        if (activities.charge_type === '0') {
          finalTotal = validTotal * ((100 - activities.discount) / 100);
        } else {
          finalTotal = validTotal - activities.discount;
        }
        break;
      case '1': // 1-指定商品 則需確認點餐清單內有該商品。
        // 因為可能有多個商品，所以要用迴圈去確認
        // 並記錄每個商品要折扣的金額，最後再由有效應收金額扣除
        // 找目標折扣商品
        // 備註：都只折扣一次
        let needMinus = 0;

        activities.act_products_list.forEach((act_product) => {
          if (validObj[act_product]) {
            if (activities.charge_type === '0') {
              needMinus =
                needMinus +
                validObj[act_product].product_price *
                  (activities.discount / 100);
            } else {
              needMinus = needMinus + activities.discount;
            }
          }
        });
        finalTotal = validTotal - needMinus;
        break;
      default:
        break;
    }

    return finalTotal;
  }
}
