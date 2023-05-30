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
import { Document, Types } from 'mongoose';
import { ProductTags } from '../product-tags';
import { User } from '../user';
export type ProductListDocument = ProductList & Document;
export declare class ProductList {
    product_name: string;
    product_type: string;
    product_tags: ProductTags;
    product_image: string;
    product_price: number;
    product_note: Array<string>;
    create_time: Date;
    create_user: User;
    is_delete: boolean;
    set_state_time: Date;
    set_state_user: User;
}
export declare const ProductListSchema: import("mongoose").Schema<ProductList, import("mongoose").Model<ProductList, any, any, any, Document<unknown, any, ProductList> & Omit<ProductList & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductList, Document<unknown, {}, import("mongoose").FlatRecord<ProductList>> & Omit<import("mongoose").FlatRecord<ProductList> & {
    _id: Types.ObjectId;
}, never>>;
