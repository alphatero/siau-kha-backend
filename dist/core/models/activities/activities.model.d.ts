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
import { ProductList } from '../product-list';
export type ActivitiesDocument = Activities & Document;
export declare class Activities {
    activities_name: string;
    discount_type: string;
    charge_type: string;
    min_spend: number;
    discount: number;
    is_period: boolean;
    start_time: Date;
    end_time: Date;
    act_products_list: ProductList;
    create_time: Date;
    status: boolean;
    is_delete: boolean;
}
export declare const ActivitiesSchema: import("mongoose").Schema<Activities, import("mongoose").Model<Activities, any, any, any, Document<unknown, any, Activities> & Omit<Activities & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Activities, Document<unknown, {}, import("mongoose").FlatRecord<Activities>> & Omit<import("mongoose").FlatRecord<Activities> & {
    _id: Types.ObjectId;
}, never>>;
