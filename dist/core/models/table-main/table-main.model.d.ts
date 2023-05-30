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
import { Order } from '../order/order.model';
import { TableStatus } from './table-main.type';
export type TableMainDocument = TableMain & Document;
export declare class TableMain {
    table_name: string;
    seat_max: number;
    status: TableStatus;
    is_delete: boolean;
    order: Order;
}
declare const TableMainSchema: import("mongoose").Schema<TableMain, import("mongoose").Model<TableMain, any, any, any, Document<unknown, any, TableMain> & Omit<TableMain & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TableMain, Document<unknown, {}, import("mongoose").FlatRecord<TableMain>> & Omit<import("mongoose").FlatRecord<TableMain> & {
    _id: Types.ObjectId;
}, never>>;
export { TableMainSchema };
