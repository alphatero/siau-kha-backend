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
import { Model } from 'mongoose';
import { Activities, ActivitiesDocument } from 'src/core/models/activities';
import { ProductListDocument } from 'src/core/models/product-list';
import { CreateManageActivityDto, UpdateManageActivityDto } from './dto';
export declare class ManageActivitiesService {
    private readonly activitiesModel;
    private readonly productListModel;
    constructor(activitiesModel: Model<ActivitiesDocument>, productListModel: Model<ProductListDocument>);
    getActivitiesList(isManagement: boolean): Promise<{
        act_list: {
            id: any;
            activities_name: string;
            discount_type: string;
            charge_type: string;
            min_spend: number;
            discount: number;
            is_period: boolean;
            start_time: Date;
            end_time: Date;
            act_products_list: {
                id: any;
                product_name: string;
                product_type: string;
                product_price: number;
            }[];
            status: boolean;
        }[];
    }>;
    createActivities(dto: CreateManageActivityDto): Promise<import("mongoose").Document<unknown, {}, ActivitiesDocument> & Omit<Activities & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateActivities(actId: string, dto: UpdateManageActivityDto): Promise<import("mongoose").Document<unknown, {}, ActivitiesDocument> & Omit<Activities & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteActivities(actId: string): Promise<void>;
}
