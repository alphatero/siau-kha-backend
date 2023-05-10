import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  public async OrderFlow(dto: CreateOrderDetailDto, order_id: string) {
    const { activitie_id } = dto;
    if (!order_id) throw new BadRequestException('order_id 不存在');

    // 取得活動折扣
    let count;
    const activitie = await this.activitiesModel.findById(activitie_id).exec();

    if (!activitie) throw new BadRequestException('activitie_id 不存在');

    if (activitie.discount_type === '0') {
      count = activitie.discount_rate / 100;
    }

    // 取得新增product_detail的doc
    const createdProductDetails = await this.createProductDetail(
      dto,
      order_id,
      count,
    );

    // 取得新增product_detail的id []
    const product_detail = createdProductDetails.map(
      (productDetail) => productDetail._id,
    );

    // 取得新增order_detail的總額 (未折扣)
    const order_detail_total = createdProductDetails.reduce(
      (acc, cur) => acc + cur.product_price,
      0,
    );

    // 取得實際金額的總額
    const order_detail_final_total = createdProductDetails.reduce(
      (acc, cur) => acc + cur.product_final_price,
      0,
    );

    // 取得該張order的create_user、total、final_total
    const order = await this.orderModel.findById(order_id).exec();
    const { create_user } = order;

    const createdOrderDetail = await this.createOrderDetail(
      order_id,
      product_detail,
      order_detail_total,
      create_user,
    );

    await this.updateOrder(
      order_id,
      order_detail_total,
      order_detail_final_total,
      createdOrderDetail,
    );

    return createdOrderDetail;
  }

  public async createProductDetail(
    dto: CreateOrderDetailDto,
    order_id: string,
    count: number,
  ) {
    const productDetails = [];

    for (const product of dto.product_detail) {
      const { product_id, product_quantity, product_note } = product;
      console.log('product_id', product_id);
      const productData = await this.productListModel
        .findById(product_id)
        .exec();

      if (!productData) throw new BadRequestException(`product_id 不存在`);

      const { product_name, product_price } = productData;

      productDetails.push({
        product_name: product_name,
        product_price: product_price,
        product_final_price: count
          ? Math.round(product_price * count)
          : product_price,
        product_quantity: product_quantity,
        product_note: product_note,
        order_id: new Types.ObjectId(order_id),
        status: ProductDetailStatus.IN_PROGRESS,
        is_delete: false,
      });
    }

    return await this.productDetailModel.insertMany(productDetails);
  }

  public async createOrderDetail(
    order_id: string,
    product_detail: unknown[],
    order_detail_total: number,
    create_user: User,
  ) {
    return await this.orderDetailModel.create({
      order: new Types.ObjectId(order_id),
      product_detail: product_detail,
      total: order_detail_total,
      create_user: create_user,
      status: OrderDetailStatus.IN_PROGRESS,
    });
  }

  public async updateOrder(
    order_id: string,
    order_detail_total: number,
    order_detail_final_total: number,
    createdOrderDetail: OrderDetail & { _id: string },
  ) {
    const order = await this.orderModel.findById(order_id).exec();
    const { total, final_total } = order;

    return await this.orderModel.findByIdAndUpdate(order_id, {
      total: total + order_detail_total,
      final_total: final_total + order_detail_final_total,
      $push: { order_detail: createdOrderDetail._id },
    });
  }
}
