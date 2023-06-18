import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession } from 'mongoose';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

import { ProductDetailStatus } from 'src/core/models/product-detail';
import {
  ProductDetail,
  ProductDetailDocument,
} from 'src/core/models/product-detail';
import { Order, OrderDocument } from 'src/core/models/order';
import { OrderDetail, OrderDetailDocument } from 'src/core/models/order-detail';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import { User } from 'src/core/models/user';
import { validateObjectIds } from 'src/common/utils/validate';
import { formatDateTime } from 'src/common/utils/time';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderDetail.name)
    private readonly orderDetailModel: Model<OrderDetailDocument>,
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetailDocument>,
    @InjectModel(ProductList.name)
    private readonly productListModel: Model<ProductListDocument>,
  ) {}

  /** B-10 送出餐點紀錄
   * 新增 product_detail
   * 新增 order_detail
   * 修改 order 總額 實際總額
   * @param dto
   * @param order_id
   * @returns
   */
  public async orderFlow(dto: CreateOrderDetailDto, order_id: string) {
    const productIdsInRequest = dto.product_detail.map((product_detail) => ({
      product_id: product_detail.product_id,
    }));
    validateObjectIds({
      order_id,
      productIdsInRequest,
    });
    const order = await this.orderModel.findById(order_id).exec();
    if (!order) {
      throw new BadRequestException('找不到此筆訂單');
    }

    // productDetail transaction
    const productDetailSession =
      await this.productDetailModel.db.startSession();
    const orderDetailSession = await this.orderDetailModel.db.startSession();
    const orderSession = await this.orderModel.db.startSession();

    productDetailSession.startTransaction();
    orderDetailSession.startTransaction();
    orderSession.startTransaction();

    try {
      // 取得新增product_detail的doc
      const createdProductDetails = await this.createProductDetail(
        dto,
        order_id,
        { session: productDetailSession },
      );

      // 取得新增product_detail的id []
      const product_detail = createdProductDetails.map(
        (productDetail: ProductDetailDocument) => productDetail._id,
      );

      // 取得新增order_detail的總額 (未折扣)
      const order_detail_total = createdProductDetails.reduce((acc, cur) => {
        if (!cur.is_delete) {
          return acc + cur.product_price * cur.product_quantity;
        }
        return acc;
      }, 0);

      // 取得該張order的create_user、total
      const order = await this.orderModel.findById(order_id).exec();
      const { create_user } = order;

      const createdOrderDetail: OrderDetailDocument[] =
        await this.createOrderDetail(
          order_id,
          product_detail,
          order_detail_total,
          create_user,
          { session: orderDetailSession },
        );

      await this.updateOrder(order_id, order_detail_total, createdOrderDetail, {
        session: orderSession,
      });

      const result = createdOrderDetail.map((item) => ({
        order: item.order,
        product_detail: item.product_detail,
        total: item.total,
        id: item._id,
        create_time: item.create_time,
        updateAt: item.update_time,
      }));

      await productDetailSession.commitTransaction();
      await orderDetailSession.commitTransaction();
      await orderSession.commitTransaction();
      return result;
    } catch (error) {
      // 有錯誤就roll back
      await productDetailSession.abortTransaction();
      await orderDetailSession.abortTransaction();
      await orderSession.abortTransaction();
      throw error;
    } finally {
      // 結束session
      await orderSession.endSession();
      await orderDetailSession.endSession();
      await productDetailSession.endSession();
    }
  }

  public async createProductDetail(
    dto: CreateOrderDetailDto,
    order_id: string,
    opts: { session: ClientSession },
  ) {
    // 取得所有的 product_id
    const productIds = dto.product_detail.map((product) => product.product_id);

    // 一次性獲取所有的product
    const productDatas = await this.productListModel
      .find({ _id: { $in: productIds } })
      .exec();

    const foundProductIds = productDatas.map((productData) =>
      productData._id.toString(),
    );
    const notFoundProductIds = productIds.filter(
      (productId) => !foundProductIds.includes(productId),
    );

    if (notFoundProductIds.length > 0) {
      throw new BadRequestException(
        `找不到此: ${notFoundProductIds.join(', ')} 商品`,
      );
    }

    // 將 productDatas 轉換為以 id 為 key 的 map
    const productDataMap = productDatas.reduce((map, productData) => {
      map[productData._id] = productData;
      return map;
    }, {});

    // 生成 product_detail
    const productDetails = dto.product_detail.map((product) => {
      const productData = productDataMap[product.product_id];
      if (!productData) throw new BadRequestException(`找不到此筆單品`);

      const { product_name, product_price } = productData;
      const { product_quantity, product_note } = product;

      return {
        product_id: product.product_id,
        product_name: product_name,
        product_price: product_price,
        product_final_price: product_price,
        product_quantity: product_quantity,
        product_note: product_note,
        order_id: new Types.ObjectId(order_id),
        status: ProductDetailStatus.IN_PROGRESS,
        is_delete: false,
      };
    });

    return await this.productDetailModel.insertMany(productDetails, opts);
  }

  public async createOrderDetail(
    order_id: string,
    product_detail: ProductDetail[],
    order_detail_total: number,
    create_user: User,
    opts: { session: ClientSession },
  ) {
    return await this.orderDetailModel.create(
      [
        {
          order: new Types.ObjectId(order_id),
          product_detail: product_detail,
          total: order_detail_total,
          create_user: create_user,
        },
      ],
      {
        session: opts.session,
      },
    );
  }

  public async updateOrder(
    order_id: string,
    order_detail_total: number,
    createdOrderDetail: OrderDetailDocument[],
    opts: { session: ClientSession },
  ) {
    const order = await this.orderModel.findById(order_id).exec();
    const { total } = order;

    return await this.orderModel.findByIdAndUpdate(
      order_id,
      {
        total: total + order_detail_total,
        $push: { order_detail: new Types.ObjectId(createdOrderDetail[0]._id) },
      },
      {
        session: opts.session,
        new: true,
      },
    );
  }

  /** B-6 取得此桌訂單紀錄
   * @param id
   * @returns
   */
  public async getOrderDetail(id: string) {
    validateObjectIds({ oredr_id: id });
    try {
      const order: OrderDocument = await this.orderModel.findById(id).exec();
      const productListObj = {}; // 存放所有有效的餐點，以 product_id 為 key
      let validTotal = 0;
      let finalTotal = 0;

      order.order_detail.forEach((detail) => {
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

      Object.values(productListObj).map((product: any) => {
        const { product_price, product_quantity } = product;
        const product_final_price = product_price * product_quantity;
        validTotal = validTotal + product_final_price;
      });

      if (order.activities) {
        finalTotal = this.calActivityDiscount(
          productListObj,
          validTotal,
          order.activities,
        );
      } else {
        finalTotal = validTotal;
      }

      const activity_charge = finalTotal - validTotal;

      const result = {
        order_detail: order.order_detail.map((detail: OrderDetailDocument) => ({
          id: detail._id,
          product_detail: detail.product_detail.map(
            (product: ProductDetailDocument) => ({
              id: product.id,
              product_name: product.product_name,
              product_price: product.product_price,
              product_quantity: product.product_quantity,
              product_note: product.product_note,
              status: product.status,
              is_delete: product.is_delete,
              order_time: formatDateTime(detail.create_time),
            }),
          ),
          activities: order.activities
            ? {
                activities_name: order.activities.activities_name,
                discount_type: order.activities.discount_type,
                charge_type: order.activities.charge_type,
                activity_charge: activity_charge,
              }
            : {},
          create_time: detail.create_time,
        })),
        total: order.total,
      };

      return result;
    } catch (error) {
      throw new BadRequestException('找不到此筆訂單');
    }
  }

  // === B-7 單一餐點退點 ===
  /** B-7 單一餐點退點
   * 更新 product_detail -> is_delete
   * 更新 order_detail -> total product_detail 金額
   * 更新 order -> total final_total
   * @param orderId
   * @param detailId
   * @param pId
   */
  public async deleteOrderDetail(
    orderId: string,
    detailId: string,
    pId: string,
  ) {
    validateObjectIds({
      order_id: orderId,
      order_detail_id: detailId,
      product_detail_id: pId,
    });

    const productDetailSession =
      await this.productDetailModel.db.startSession();
    const orderDetailSession = await this.orderDetailModel.db.startSession();
    const orderSession = await this.orderModel.db.startSession();
    productDetailSession.startTransaction();
    orderDetailSession.startTransaction();
    orderSession.startTransaction();
    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) throw new BadRequestException('找不到此筆訂單');

      // 取得order_detail
      const orderDetail = await this.orderDetailModel.findById(detailId).exec();
      if (!orderDetail) throw new BadRequestException('無找不到此筆訂單明細');

      const { product_detail } = orderDetail;

      const productDetailIsExist = product_detail.findIndex(
        (detail: ProductDetailDocument) => detail._id.toString() === pId,
      );

      if (productDetailIsExist === -1) {
        throw new BadRequestException('找不到此筆單品');
      }

      // 如果是已完成的訂單或已刪除訂單，則不可退點
      if (
        product_detail[productDetailIsExist].status ===
        ProductDetailStatus.FINISH
      ) {
        throw new BadRequestException('此訂單已完成，不可退點');
      }
      if (
        product_detail[productDetailIsExist].status ===
        ProductDetailStatus.SUCCESS
      ) {
        throw new BadRequestException('此訂單已送出，不可退點');
      }
      if (product_detail[productDetailIsExist].is_delete) {
        throw new BadRequestException('此訂單已刪除，不可退點');
      }

      // 修改produce detail 狀態
      await this.productDetailModel.findByIdAndUpdate(
        pId,
        {
          $set: {
            is_delete: true,
          },
        },
        { new: true, session: productDetailSession },
      );

      // 應扣除額 (未折扣)
      const deduct =
        product_detail[productDetailIsExist].product_price *
        product_detail[productDetailIsExist].product_quantity;
      // 修改order-detail total
      const { total: orderDetailTotal } = orderDetail;
      const newOrderDetailTotal = orderDetailTotal - deduct;
      await this.orderDetailModel.findByIdAndUpdate(
        detailId,
        {
          $set: {
            total: newOrderDetailTotal,
          },
        },
        { new: true, session: orderDetailSession },
      );

      // 修改order final_total total
      const { total: OrderTotal } = order;
      const newOrderTotal = OrderTotal - deduct;

      await this.orderModel.findByIdAndUpdate(
        orderId,
        {
          $set: {
            total: newOrderTotal,
          },
        },
        { new: true, session: orderSession },
      );

      await productDetailSession.commitTransaction();
      await orderDetailSession.commitTransaction();
      await orderSession.commitTransaction();
    } catch (error) {
      await productDetailSession.abortTransaction();
      await orderDetailSession.abortTransaction();
      await orderSession.abortTransaction();
      throw error;
    } finally {
      productDetailSession.endSession();
      orderDetailSession.endSession();
      orderSession.endSession();
    }
  }

  /** B-8 單一餐點上菜 & B-14 單一餐點出菜
   * 驗證 order 是否有此訂單明細 -> order_detail
   * 驗證 order_detail 是否有此產品明細 -> product_detail
   * actionType = SUCCESS： 單一餐點上菜, 修改此單品狀態 status -> SUCCESS
   * actionType = FINISH：  單一餐點出菜：修改此單品狀態 status -> FINISH
   * @param orderId
   * @param detailId
   * @param pId
   * @param actionType
   * @returns {Promise<ProductDetailDocument>}
   */
  public async patchOrderDetail(
    orderId: string,
    detailId: string,
    pId: string,
    actionType: ProductDetailStatus,
  ) {
    validateObjectIds({
      order_id: orderId,
      order_detail_id: detailId,
      product_detail_id: pId,
    });

    const order = await this.orderModel.findById(orderId).exec();

    if (!order) throw new BadRequestException('找不到此筆訂單');

    const orderDetailIsExist = order.order_detail.findIndex(
      (detail: OrderDetailDocument) => detail._id.toString() === detailId,
    );

    if (orderDetailIsExist === -1) {
      throw new BadRequestException('找不到此筆訂單明細');
    }

    const orderDetail = order.order_detail[orderDetailIsExist];

    const { product_detail } = orderDetail;

    const productDetailIsExist = product_detail.findIndex(
      (detail: ProductDetailDocument) => detail._id.toString() === pId,
    );

    if (productDetailIsExist === -1) {
      throw new BadRequestException('找不到此筆單品');
    }

    if (actionType === ProductDetailStatus.SUCCESS) {
      // ============== 上菜 ==============

      // 如果此單品已退點，則不可上菜
      if (product_detail[productDetailIsExist].is_delete) {
        throw new BadRequestException('此單品已經退點，不可上菜');
      }
      // 如果此單品尚未完成，則不可上菜 -> for demo 移除卡控
      // if (
      //   product_detail[productDetailIsExist].status ===
      //   ProductDetailStatus.IN_PROGRESS
      // ) {
      //   throw new BadRequestException('此單品尚未完成，不可上菜');
      // }

      // 如果此單品已經上菜過，則不可再次上菜
      if (
        product_detail[productDetailIsExist].status ===
        ProductDetailStatus.SUCCESS
      ) {
        throw new BadRequestException('此單品已經上菜過');
      }
    } else if (actionType === ProductDetailStatus.FINISH) {
      // ============== 出菜 ==============

      // 如果此單品已退點，則不可出菜
      if (product_detail[productDetailIsExist].is_delete) {
        throw new BadRequestException('此單品已經退點，不可出菜');
      }
      // 如果此單品已上菜，則不可出菜
      if (
        product_detail[productDetailIsExist].status ===
        ProductDetailStatus.SUCCESS
      ) {
        throw new BadRequestException('此單品已上菜，不可出菜');
      }

      // 如果此單品已經出菜過，則不可再次出菜
      if (
        product_detail[productDetailIsExist].status ===
        ProductDetailStatus.FINISH
      ) {
        throw new BadRequestException('此單品已經出菜過');
      }
    }

    await this.productDetailModel.findByIdAndUpdate(
      pId,
      {
        $set: {
          status: actionType,
        },
      },
      { new: true },
    );

    return {};
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
