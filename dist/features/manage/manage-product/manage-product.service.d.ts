/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { FoodItemDocument } from 'src/core/models/food-item';
import { ProductListDocument } from 'src/core/models/product-list';
import { ProductTags, ProductTagsDocument, ProductTagStatus } from 'src/core/models/product-tags';
import { IUserPayload } from 'src/features/auth';
import { AddTagDto, AddProductDto, SortingDto, ChangeTagStatusDto, UpdateProductDto } from './dto';
export declare class ManageProductService {
    private readonly productTagsModel;
    private readonly productListModel;
    private readonly foodItemModel;
    constructor(productTagsModel: Model<ProductTagsDocument>, productListModel: Model<ProductListDocument>, foodItemModel: Model<FoodItemDocument>);
    getProductTags(): Promise<{
        list: {
            id: any;
            tag_name: string;
            status: ProductTagStatus;
            sort_no: number;
        }[];
    }>;
    createProductTag(dto: AddTagDto, user: IUserPayload): Promise<void>;
    editProductTag(dto: AddTagDto, id: string, user: IUserPayload): Promise<void>;
    handleProductTagStatus(dto: ChangeTagStatusDto, id: string, user: IUserPayload): Promise<void>;
    deleteProductTag(id: string, user: IUserPayload): Promise<void>;
    changeProductTagSortNo(idList: SortingDto, user: IUserPayload): Promise<void>;
    addProduct(dto: AddProductDto, user: IUserPayload, middle_data: any): Promise<void>;
    getProducts(): Promise<{
        list: {
            id: any;
            product_name: any;
            product_type: any;
            product_tags: any;
            product_image: any;
            product_price: any;
            product_note: any;
            food_consumption_list: any;
            is_delete: any;
        }[];
    }>;
    getProduct(p_id: string): Promise<{
        id: any;
        product_name: string;
        product_type: number;
        product_tags: import("mongoose").FlattenMaps<ProductTags>;
        product_image: string;
        product_price: number;
        product_note: import("mongoose").FlattenMaps<import("../../../core/models/product-list/product-list.type").ProductNote>[];
        food_consumption_list: any;
    }>;
    updateProduct(dto: UpdateProductDto, user: IUserPayload, middle_data: any, p_id: string): Promise<void>;
    closeProduct(p_id: string, user: IUserPayload): Promise<void>;
    private findEnableTags;
    private findTags;
    private findTag;
    private doCombineData;
}
