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
import { ProductDetail } from '../product-detail/product-detail.model';
import { User } from '../user';
export type OrderDetailDocument = OrderDetail & Document;
export declare class OrderDetail {
    order: Order;
    product_detail: ProductDetail[];
    total: number;
    create_user: User;
    create_time: Date;
    update_time: Date;
}
declare const OrderDetailSchema: import("mongoose").Schema<OrderDetail, import("mongoose").Model<OrderDetail, any, any, any, Document<unknown, any, OrderDetail> & Omit<OrderDetail & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderDetail, Document<unknown, {}, import("mongoose").FlatRecord<OrderDetail>> & Omit<import("mongoose").FlatRecord<OrderDetail> & {
    _id: Types.ObjectId;
}, never>>;
export { OrderDetailSchema };
