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
export type FoodGroupDocument = FoodGroup & Document;
export declare class FoodGroup {
    group_name: string;
    is_delete: boolean;
    create_time: Date;
}
declare const FoodGroupSchema: import("mongoose").Schema<FoodGroup, import("mongoose").Model<FoodGroup, any, any, any, Document<unknown, any, FoodGroup> & Omit<FoodGroup & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FoodGroup, Document<unknown, {}, import("mongoose").FlatRecord<FoodGroup>> & Omit<import("mongoose").FlatRecord<FoodGroup> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export { FoodGroupSchema };
