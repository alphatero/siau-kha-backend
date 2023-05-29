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
import { User } from '../user';
import { ProductTagStatus } from './product-tags.type';
export type ProductTagsDocument = ProductTags & Document;
export declare class ProductTags {
    tag_name: string;
    create_user: User;
    create_time: Date;
    status: ProductTagStatus;
    set_state_time: Date;
    set_state_user: User;
    sort_no: number;
}
export declare const ProductTagsSchema: import("mongoose").Schema<ProductTags, import("mongoose").Model<ProductTags, any, any, any, Document<unknown, any, ProductTags> & Omit<ProductTags & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductTags, Document<unknown, {}, import("mongoose").FlatRecord<ProductTags>> & Omit<import("mongoose").FlatRecord<ProductTags> & {
    _id: Types.ObjectId;
}, never>>;
