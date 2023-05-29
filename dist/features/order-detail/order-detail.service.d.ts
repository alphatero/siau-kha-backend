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
import { Model, Types, ClientSession } from 'mongoose';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { ProductDetailStatus } from 'src/core/models/product-detail';
import { ProductDetail, ProductDetailDocument } from 'src/core/models/product-detail';
import { Order, OrderDocument } from 'src/core/models/order';
import { OrderDetail, OrderDetailDocument } from 'src/core/models/order-detail';
import { ProductListDocument } from 'src/core/models/product-list';
import { User } from 'src/core/models/user';
export declare class OrderDetailService {
    private readonly orderModel;
    private readonly orderDetailModel;
    private readonly productDetailModel;
    private readonly productListModel;
    constructor(orderModel: Model<OrderDocument>, orderDetailModel: Model<OrderDetailDocument>, productDetailModel: Model<ProductDetailDocument>, productListModel: Model<ProductListDocument>);
    orderFlow(dto: CreateOrderDetailDto, order_id: string): Promise<{
        order: Order;
        product_detail: ProductDetail[];
        total: number;
        id: any;
        create_time: Date;
        updateAt: Date;
    }[]>;
    createProductDetail(dto: CreateOrderDetailDto, order_id: string, opts: {
        session: ClientSession;
    }): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("mongoose").MergeType<ProductDetailDocument, {
        product_id: string;
        product_name: any;
        product_price: any;
        product_final_price: any;
        product_quantity: number;
        product_note: string[];
        order_id: Types.ObjectId;
        status: ProductDetailStatus;
        is_delete: boolean;
    }[]>, ProductDetail & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>> & Omit<Omit<import("mongoose").MergeType<ProductDetailDocument, {
        product_id: string;
        product_name: any;
        product_price: any;
        product_final_price: any;
        product_quantity: number;
        product_note: string[];
        order_id: Types.ObjectId;
        status: ProductDetailStatus;
        is_delete: boolean;
    }[]>, keyof ProductDetail | keyof import("mongoose").Document<any, any, any>> & ProductDetail & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    createOrderDetail(order_id: string, product_detail: ProductDetail[], order_detail_total: number, create_user: User, opts: {
        session: ClientSession;
    }): Promise<(import("mongoose").Document<unknown, {}, OrderDetailDocument> & Omit<OrderDetail & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    updateOrder(order_id: string, order_detail_total: number, createdOrderDetail: OrderDetailDocument[], opts: {
        session: ClientSession;
    }): Promise<import("mongoose").Document<unknown, {}, OrderDocument> & Omit<Order & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    getOrderDetail(id: string): Promise<{
        order_detail: {
            id: any;
            product_detail: {
                id: any;
                product_name: string;
                product_price: number;
                product_quantity: number;
                product_note: string[];
                status: ProductDetailStatus;
                is_delete: boolean;
            }[];
            create_time: Date;
        }[];
        total: number;
    }>;
    deleteOrderDetail(orderId: string, detailId: string, pId: string): Promise<void>;
    patchOrderDetail(orderId: string, detailId: string, pId: string): Promise<{}>;
}
