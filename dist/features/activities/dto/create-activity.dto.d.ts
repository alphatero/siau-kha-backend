export declare class CreateActivityDto {
    readonly activities_name: string;
    readonly discount_type: string;
    readonly charge_type: string;
    readonly min_spend: number;
    readonly discount: number;
    readonly is_period?: boolean;
    readonly start_time: Date;
    readonly end_time: Date;
    act_products_list: string[];
    readonly status?: boolean;
    readonly is_delete?: boolean;
}
