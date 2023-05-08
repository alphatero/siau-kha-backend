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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
export declare class TableController {
    private readonly tableService;
    constructor(tableService: TableService);
    getTableList(): Promise<{
        table_list: {
            id: any;
            table_name: string;
            seat_max: number;
            status: import("../../core/models/table-main").TableStatus;
            customer_num: number;
            create_time: Date;
            is_pay: boolean;
        }[];
    }>;
    createTable(dto: CreateTableDto): Promise<import("mongoose").Document<unknown, {}, import("../../core/models/table-main").TableMainDocument> & Omit<import("../../core/models/table-main").TableMain & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
