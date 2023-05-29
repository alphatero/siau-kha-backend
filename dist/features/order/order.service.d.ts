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
import { Model, Types } from 'mongoose';
import { ActivitiesDocument } from 'src/core/models/activities';
import { Order, OrderDocument } from 'src/core/models/order';
export declare class OrderService {
    private readonly orderModel;
    private readonly activitiesModel;
    constructor(orderModel: Model<OrderDocument>, activitiesModel: Model<ActivitiesDocument>);
    updateOrderActivities(order_id: string, a_id: string, operate_type: 'CREATE' | 'DELETE'): Promise<import("mongoose").Document<unknown, {}, OrderDocument> & Omit<Order & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
}
