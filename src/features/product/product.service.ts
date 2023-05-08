import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import { ProductTags, ProductTagsDocument } from 'src/core/models/product-tags';
import { IUserPayload } from '../auth';
import { CreateProductTagDto } from './dto/create-product-tag.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductTags.name)
    private readonly productTagsModel: Model<ProductTagsDocument>,
    @InjectModel(ProductList.name)
    private readonly productListModel: Model<ProductListDocument>,
  ) {}
  public async getProductTags(filters?: FilterQuery<ProductTags>) {
    const query = this.productTagsModel.find(filters);
    return query;
  }

  public async createProductTag(dto: CreateProductTagDto, user: IUserPayload) {
    const { tag_name, sort_no } = dto;
    return this.productTagsModel.create({
      tag_name,
      create_user: new Types.ObjectId(user.id),
      set_state_time: new Date(),
      set_state_user: new Types.ObjectId(user.id),
      sort_no: sort_no,
    });
  }

  public async getProducts(filters?: FilterQuery<ProductList>) {
    const filter: FilterQuery<ProductList> = {};
    if (filters?.tag_id) {
      if (!Types.ObjectId.isValid(filters.tag_id)) {
        throw new BadRequestException('tag_id 格式錯誤');
      }
      filter.product_tags = new Types.ObjectId(filters.tag_id);
    }
    if (filters?.product_name) {
      filter.product_name = new RegExp(filters.product_name);
    }
    console.log(filter);

    const query = this.productListModel.find(filter);
    return query;
  }

  public async getProduct(filters?: FilterQuery<ProductList>) {
    console.log(filters);
    if (!Types.ObjectId.isValid(filters.id)) {
      throw new BadRequestException('id 格式錯誤');
    }
    return this.productListModel
      .findOne({ _id: new Types.ObjectId(filters.id) })
      .exec();
  }
}
