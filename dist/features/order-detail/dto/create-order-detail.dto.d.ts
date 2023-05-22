export declare class ProductDetailInOrderDetail {
    readonly product_id: string;
    readonly product_quantity: number;
    readonly product_note: string[];
}
export declare class CreateOrderDetailDto {
    readonly product_detail: ProductDetailInOrderDetail[];
}
