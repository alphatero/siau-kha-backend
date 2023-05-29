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
import { FilterQuery, Model, Types } from 'mongoose';
import { ProductList, ProductListDocument } from 'src/core/models/product-list';
import { ProductTags, ProductTagsDocument } from 'src/core/models/product-tags';
import { IUserPayload } from '../auth';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
export declare class ProductService {
    private readonly productTagsModel;
    private readonly productListModel;
    constructor(productTagsModel: Model<ProductTagsDocument>, productListModel: Model<ProductListDocument>);
    getProductTags(filters?: FilterQuery<ProductTags>): Promise<(import("mongoose").Document<unknown, {}, ProductTagsDocument> & Omit<ProductTags & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    createProductTag(dto: CreateProductTagDto, user: IUserPayload): Promise<import("mongoose").Document<unknown, {}, ProductTagsDocument> & Omit<ProductTags & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    getProducts(filters?: FilterQuery<ProductList>): Promise<(import("mongoose").Document<unknown, {}, ProductListDocument> & Omit<ProductList & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    getProduct(filters?: FilterQuery<ProductList>): Promise<import("mongoose").Document<unknown, {}, ProductListDocument> & Omit<ProductList & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
}
