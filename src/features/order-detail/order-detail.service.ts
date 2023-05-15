import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession } from 'mongoose';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

import { ProductDetailStatus } from 'src/core/models/product-detail';
import { OrderDetailStatus } from 'src/core/models/order-detail';
import {
  ProductDetail,
  ProductDetailDocument,
} from 'src/core/models/product-detail';
import { Order, OrderDocument } from 'src/core/models/order';
import { OrderDetail, OrderDetailDocument } from 'src/core/models/order-detail';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
import { User } from 'src/core/models/user';

function validateObjectIds(ids) {
  Object.entries(ids).forEach(([key, value]: [string, string | any[]]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        Object.entries(val).forEach(([k, v]: [string, string]) => {
          if (!Types.ObjectId.isValid(v)) {
            throw new BadRequestException(`${k}格式錯誤`);
          }
        });
      });
      return;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${key}格式錯誤`);
    }
  });
}

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
    @InjectModel(Activities.name)
    private readonly activitiesModel: Model<ActivitiesDocument>,
  ) {}

  /** B-10 送出餐點紀錄
   * 透過 order_id 取得 活動折扣
   * 新增 product_detail
   * 新增 order_detail
   * 修改 order 總額 實際總額
   * @param dto
   * @param order_id
   * @returns
   */
  public async OrderFlow(dto: CreateOrderDetailDto, order_id: string) {
    const { activitie_id } = dto;
    const productIdsInRequest = dto.product_detail.map((product_detail) => ({
      product_id: product_detail.product_id,
    }));
    validateObjectIds({
      order_id,
      activitie_id,
      productIdsInRequest,
    });
    const order = await this.orderModel.findById(order_id).exec();
    if (!order) {
      throw new BadRequestException('找不到此筆訂單');
    }
    // 取得活動折扣
    const activitie = await this.activitiesModel.findById(activitie_id).exec();

    if (!activitie) throw new BadRequestException('找不到此優惠活動');

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
      await productDetailSession.commitTransaction();
      await orderDetailSession.commitTransaction();
      await orderSession.commitTransaction();
      return createdOrderDetail;
    } catch (error) {
      // 有錯誤就roll back
      await productDetailSession.abortTransaction();
      await orderDetailSession.abortTransaction();
      await orderSession.abortTransaction();
      throw error;
    } finally {
      // 結束session
      await productDetailSession.endSession();
      await orderDetailSession.endSession();
      await orderSession.endSession();
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
          status: OrderDetailStatus.IN_PROGRESS,
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
            }),
          ),
          create_time: detail.create_time,
        })),
        total: order.final_total,
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
      oreder_detail_id: detailId,
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

  /** B-8 單一餐點上菜
   * 驗證 order 是否有此訂單明細 -> order_detail
   * 驗證 order_detail 是否有此產品明細 -> product_detail
   * 修改此單品狀態 status -> SUCCESS
   * @param orderId
   * @param detailId
   * @param pId
   * @returns {Promise<ProductDetailDocument>}
   */
  public async patchOrderDetail(
    orderId: string,
    detailId: string,
    pId: string,
  ) {
    validateObjectIds({
      order_id: orderId,
      oreder_detail_id: detailId,
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

    this.productDetailModel.findByIdAndUpdate(
      pId,
      {
        $set: {
          status: ProductDetailStatus.SUCCESS,
        },
      },
      { new: true },
    );

    return {};
  }
}
