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
export type FoodItemDocument = FoodItem & Document;
export declare class FoodItem {
    food_items_name: string;
    group: string;
    purchase_cost: number;
    item_stock: number;
    safety_stock: number;
    status: string;
    units: string;
    create_time: Date;
    create_user: User;
    is_delete: boolean;
}
declare const FoodItemSchema: import("mongoose").Schema<FoodItem, import("mongoose").Model<FoodItem, any, any, any, Document<unknown, any, FoodItem> & Omit<FoodItem & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FoodItem, Document<unknown, {}, import("mongoose").FlatRecord<FoodItem>> & Omit<import("mongoose").FlatRecord<FoodItem> & {
    _id: Types.ObjectId;
}, never>>;
export { FoodItemSchema };
