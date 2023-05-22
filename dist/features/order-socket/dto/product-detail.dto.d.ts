import { ProductDetailStatus } from 'src/core/models/product-detail';
export declare class ProductDetailDto {
    readonly order_id: string;
    readonly product_name: string;
    readonly product_quantity: number;
    readonly product_note: Array<string>;
    readonly status: ProductDetailStatus;
    readonly create_time: string;
}
