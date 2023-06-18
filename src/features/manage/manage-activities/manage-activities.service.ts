import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import { validateObjectIds } from 'src/common/utils/validate';

import { CreateManageActivityDto, UpdateManageActivityDto } from './dto';

@Injectable()
export class ManageActivitiesService {
  constructor(
    @InjectModel(Activities.name)
    private readonly activitiesModel: Model<ActivitiesDocument>,
    @InjectModel(ProductList.name)
    private readonly productListModel: Model<ProductListDocument>,
  ) {}
  // c-27 取得活動清單 isManagement = true 後台管理用
  async getActivitiesList(isManagement: boolean) {
    const actQueryFilter = isManagement
      ? {
          is_delete: false,
        }
      : {
          status: true,
          is_delete: false,
        };

    const query = await this.activitiesModel.find(actQueryFilter).populate({
      path: 'act_products_list',
      select: '_id product_name product_type product_price',
    });
    const activities = query.map((doc) => {
      const activity = doc.toJSON();
      return {
        id: activity._id,
        activities_name: activity.activities_name,
        discount_type: activity.discount_type,
        charge_type: activity.charge_type,
        min_spend: activity.min_spend,
        discount: activity.discount,
        is_period: activity.is_period,
        start_time: activity.start_time,
        end_time: activity.end_time,
        act_products_list: activity.act_products_list.map(
          (product: ProductListDocument) => ({
            id: product._id,
            product_name: product.product_name,
            product_type: product.product_type,
            product_price: product.product_price,
          }),
        ),
        status: activity.status,
      };
    });
    return { act_list: activities };
  }

  // c-29 新增活動
  async createActivities(dto: CreateManageActivityDto) {
    const productIds = dto.act_products_list.map((productId) => ({
      productId,
    }));
    if (productIds.length > 0) {
      validateObjectIds({
        productIds,
      });
    }
    // 驗證productIds是否存在
    const products = await this.productListModel.find({
      _id: { $in: dto.act_products_list },
    });
    if (products.length !== dto.act_products_list.length) {
      // 對比出不存在的productIds
      const notFoundIds = dto.act_products_list.filter(
        (id) => !products.map((p) => p._id).includes(id),
      );
      throw new BadRequestException(`找不到此商品ID: ${notFoundIds.join(',')}`);
    }
    const createActivities = {
      ...dto,
      status: true,
      is_delete: false,
    };
    return this.activitiesModel.create(createActivities);
  }

  // c-30 修改活動內容
  async updateActivities(actId: string, dto: UpdateManageActivityDto) {
    validateObjectIds({ actId });

    const updateDto = {
      ...dto,
      ...(dto.act_products_list &&
        dto.act_products_list.length > 0 && {
          $addToSet: { act_products_list: dto.act_products_list },
        }),
    };

    // 驗證productIds是否存在
    const products = await this.productListModel.find({
      _id: { $in: dto.act_products_list },
    });

    if (
      dto.act_products_list &&
      dto.act_products_list.length !== products.length
    ) {
      // 對比出不存在的product_Id
      const notFoundIds = dto.act_products_list.filter(
        (id) => !products.map((p) => p._id).includes(id),
      );
      throw new BadRequestException(`找不到此產品ID: ${notFoundIds.join(',')}`);
    }

    const updatedActivity = await this.activitiesModel.findByIdAndUpdate(
      actId,
      updateDto,
      { new: true },
    );

    if (!updatedActivity) {
      throw new BadRequestException(`找不到此活動ID: ${actId}`);
    }

    return updatedActivity;
  }

  // c-31 移除活動
  async deleteActivities(actId: string) {
    validateObjectIds({ actId });

    const updatedActivity = await this.activitiesModel.findByIdAndUpdate(
      actId,
      {
        is_delete: true,
      },
      { new: true },
    );

    if (!updatedActivity) {
      throw new BadRequestException(`找不到此活動ID: ${actId}`);
    }
  }
}
