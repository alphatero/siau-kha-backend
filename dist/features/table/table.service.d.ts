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
import { FilterQuery, Model, Types } from 'mongoose';
import { OrderDocument } from 'src/core/models/order';
import { TableMain, TableMainDocument } from 'src/core/models/table-main';
import { IUserPayload } from '../auth';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
export declare class TableService {
    private readonly tableMainModel;
    private readonly orderModel;
    constructor(tableMainModel: Model<TableMainDocument>, orderModel: Model<OrderDocument>);
    createTable(dto: CreateTableDto): Promise<import("mongoose").Document<unknown, {}, TableMainDocument> & Omit<TableMain & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    getTableList(filters?: FilterQuery<TableMain>): Promise<(import("mongoose").Document<unknown, {}, TableMainDocument> & Omit<TableMain & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    updateTable(id: string, dto: UpdateTableDto, user: IUserPayload): Promise<void>;
}
