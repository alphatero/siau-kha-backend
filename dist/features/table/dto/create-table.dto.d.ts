import { Order } from 'src/core/models/order';
import { TableStatus } from 'src/core/models/table-main';
export declare class CreateTableDto {
    readonly table_name: string;
    readonly seat_max: number;
    readonly status: TableStatus;
    readonly is_delete?: boolean;
    readonly order?: Order;
}
