import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import {
  ProductTags,
  ProductTagsDocument,
  ProductTagStatus,
} from 'src/core/models/product-tags';
import { IUserPayload } from 'src/features/auth';
import { CreateTagDto } from './dto';
@Injectable()
export class ManageProductService {
  constructor(
    @InjectModel(ProductTags.name)
    private readonly productTagsModel: Model<ProductTagsDocument>,
    @InjectModel(ProductList.name)
    private readonly productListModel: Model<ProductListDocument>,
  ) {}

  public async getProductTags() {
    const documents = await this.findTags();
    // 排除刪除，只回傳啟用的
    const list = documents.map((doc) => {
      const { _id, tag_name, sort_no } = doc.toJSON();
      return {
        id: _id,
        tag_name,
        sort_no,
      };
    });
    return { list };
  }

  public async createProductTag(dto: CreateTagDto, user: IUserPayload) {
    // 1. [v] 檢查id格式。
    // 2. [v] 取得所有的商品類別，並用 sort_no 排序。
    // 3. [v] 檢查是否有重複的商品類別名稱。
    // 4. [v] 取得最大的 sort_no，並 +1。
    // 5. [v] 新增商品類別。
    const documents = await this.findTags();
    const repeat = documents.find((doc) => doc.tag_name === dto.tag_name);
    if (repeat) {
      throw new BadRequestException('商品類別名稱重複');
    } else {
      const sort_no = documents.length
        ? documents[documents.length - 1].sort_no + 1
        : 1;

      const createData = {
        tag_name: dto.tag_name,
        create_user: new Types.ObjectId(user.id),
        set_state_time: new Date(),
        set_state_user: new Types.ObjectId(user.id),
        sort_no,
      };
      await this.productTagsModel.create(createData);
    }
  }

  public async editProductTag(
    dto: CreateTagDto,
    id: string,
    user: IUserPayload,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }
    const targetTag = await this.findTag(id);
    if (!targetTag) {
      throw new BadRequestException('商品類別不存在');
    }
    if (targetTag.status === ProductTagStatus.DELETE) {
      throw new BadRequestException('商品類別已被刪除');
    }
    const updatedData = {
      tag_name: dto.tag_name,
      set_state_time: new Date(),
      set_state_user: new Types.ObjectId(user.id),
    };
    await this.productTagsModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  }

  public async delProductTag(id: string, user: IUserPayload) {
    // 1. [v] 檢查id格式。
    // 2. [v] 檢查商品類別是否存在。
    // 3. [v] 檢查商品類別是否已經被刪除。
    // 4. [v] 提取要刪除的商品類別的 sort_no。
    // 5. [v] 透過 session.withTransaction() 來執行交易事務。
    // 6. [v] 將目標商品類別的狀態改為刪除以及sort_no=0。
    // 7. [v] 將所有 sort_no > 目標商品類別的 sort_no 都 -1。
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id 格式錯誤');
    }
    const targetTag = await this.findTag(id);
    if (!targetTag) {
      throw new BadRequestException('商品類別不存在');
    }
    if (targetTag.status === ProductTagStatus.DELETE) {
      throw new BadRequestException('商品類別已經被刪除');
    }
    const sortNo = targetTag.sort_no;
    const tagSession = await this.productTagsModel.db.startSession();
    tagSession.startTransaction();
    try {
      const data = {
        status: ProductTagStatus.DELETE,
        sort_no: 0,
        set_state_time: new Date(),
        set_state_user: new Types.ObjectId(user.id),
      };
      await this.productTagsModel.findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        {
          session: tagSession,
          new: true,
        },
      );
      await this.productTagsModel.updateMany(
        { sort_no: { $gt: sortNo } },
        {
          $inc: { sort_no: -1 },
          $set: {
            set_state_time: new Date(),
            set_state_user: new Types.ObjectId(user.id), // 根据实际情况更改
          },
        },
        { session: tagSession, new: true },
      );
      await tagSession.commitTransaction();
    } catch (error) {
      await tagSession.abortTransaction();
      throw error;
    } finally {
      tagSession.endSession();
    }
  }

  private async findTags() {
    return this.productTagsModel
      .find({
        status: { $ne: ProductTagStatus.DELETE },
      })
      .sort({ sort_no: 1 });
  }

  private async findTag(id: string) {
    return this.productTagsModel.findById(id);
  }
}
