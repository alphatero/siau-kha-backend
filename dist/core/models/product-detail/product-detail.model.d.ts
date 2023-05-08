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
import { Document } from 'mongoose';
import { ProductDetailStatus } from './product-detail.type';
export type ProductDetailDocument = ProductDetail & Document;
export declare class ProductDetail {
    order_id: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
    product_note: Array<string>;
    product_final_price: number;
    status: ProductDetailStatus;
    is_delete: boolean;
}
export declare const ProductDetailSchema: import("mongoose").Schema<ProductDetail, import("mongoose").Model<ProductDetail, any, any, any, Document<unknown, any, ProductDetail> & Omit<ProductDetail & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductDetail, Document<unknown, {}, import("mongoose").FlatRecord<ProductDetail>> & Omit<import("mongoose").FlatRecord<ProductDetail> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
