import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Activities } from 'src/core/models/activities';
import { Order, OrderStatus } from 'src/core/models/order';
import { OrderDetail, OrderDetailStatus } from 'src/core/models/order-detail';
import { ProductDetailStatus } from 'src/core/models/product-detail';

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
    // 1. [v] 判斷id是否為有效的ObjectId。
    // 2. [v] 透過id查詢訂單資訊。
    // 3. [v] 確認是否有此訂單。
    // 4. [v] 確認此定單 status = OrderStatus.IN_PROGRESS (尚未結帳)。
    // 6. [v] 透過訂單資訊中的order_details欄位，取得訂單明細資訊。
    // 7. [v] 透過訂單明細資訊中的product_detail欄位，取得餐點資訊。
    // 8. [v] 整理有效的 order_detail，order_detail.status === OrderDetailStatus.SUCCESS (已送出的訂單)
    // 7. [v] 整理所有有效的餐點
    //       a.[v] 計算每筆 order_detail 的總額加總，用來做後續提供給前段的應收金額
    //       b.[] product_detail.status = ProductDetailStatus.SUCCESS (已上菜)
    //       c.[] product_detail.is_delete = false。(未被退點)
    // 5. [v] 透過第2點的訂單資訊中的activities欄位，取得優惠活動資訊。
    // 8. [] 判斷 計算類別 discount_type 0-全單優惠 1-指定商品。
    // 9. [] 如果 計算類別為 1-指定商品 則需確認點餐清單內有該商品。
    // 10.[] 確認 計算類型 charge_type 0-折扣 1-折讓
    // 11.[] 依照計算類別及計算類型來計算訂單總金額。
    // 12.[] 回傳前端需要的資訊。
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }

    const order = await this.orderModel
      .findById(id)
      .populate({
        path: 'order_detail',
        populate: {
          path: 'product_detail',
          // match跟select沒有效，後續有空再研究
        },
      })
      .populate('activities');

    if (!order) {
      throw new BadRequestException('查無此訂單');
    }

    if (order.status !== OrderStatus.IN_PROGRESS) {
      throw new BadRequestException('此訂單已結帳');
    }
    // 644e9a33020c9409fe694dc4
    // console.log(OrderDetailStatus.SUCCESS);
    // const final_list = order.order_detail.filter((OrderDetail) => {
    //   OrderDetail.status === OrderDetailStatus.SUCCESS;
    // });
    // .map((detail) => {
    //   const filteredProductDetail = detail.product_detail
    //     .filter(
    //       (product) =>
    //         product.status === ProductDetailStatus.SUCCESS &&
    //         product.is_delete === false,
    //     )
    //     .map((product) => {
    //       return {
    //         product_name: product.product_name,
    //         product_price: product.product_price,
    //         product_quantity: product.product_quantity,
    //         product_final_price:
    //           product.product_price * product.product_quantity,
    //       };
    //     });

    //   return filteredProductDetail;
    // });
    const filteredOrderDetail = order.order_detail.filter(
      (detail) => detail.status === OrderDetailStatus.SUCCESS,
    );

    if (filteredOrderDetail.length === 0) {
      throw new BadRequestException('此訂單沒有可以結帳的訂單項目');
    }

    const productListObj = {};
    let OrderTotal = 0;

    filteredOrderDetail.forEach((detail) => {
      // 計算每筆 order_detail 的總額加總，用來做後續提供給前段的應收金額
      OrderTotal = OrderTotal + detail.total;

      detail.product_detail.forEach((product) => {
        // product_detail.status = ProductDetailStatus.SUCCESS (已上菜)
        // product_detail.is_delete = false。(未被退點)
        if (
          product.status === ProductDetailStatus.SUCCESS &&
          product.is_delete === false
        ) {
          // 用 product_name 做key，來合併計算相同餐點的數量及總額
          // 後續新增 product_list 的 product_name 不能重複
          if (productListObj[product.product_name]) {
            productListObj[product.product_name].product_quantity =
              productListObj[product.product_name].product_quantity +
              product.product_quantity;
            productListObj[product.product_name].product_price =
              product.product_price;
          } else {
            productListObj[product.product_name] = {
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
        return {
          product_name,
          product_price,
          product_quantity,
          product_final_price,
        };
      },
    );

    console.log(productListObj);
    console.log(order_detail_list);
    console.log(OrderTotal);

    return { order };
  }
}
