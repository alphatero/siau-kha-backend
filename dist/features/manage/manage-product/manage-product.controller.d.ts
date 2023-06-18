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
import { AddTagDto, AddProductDto, SortingDto, ChangeTagStatusDto, UpdateProductDto } from './dto';
import { ManageProductService } from './manage-product.service';
export declare class ManageProductController {
    private readonly manageProductService;
    constructor(manageProductService: ManageProductService);
    getProductTags(): Promise<{
        list: {
            id: any;
            tag_name: string;
            status: import("../../../core/models/product-tags").ProductTagStatus;
            sort_no: number;
        }[];
    }>;
    createProductTag(request: any, dto: AddTagDto): Promise<void>;
    editProductTag(request: any, id: string, dto: AddTagDto): Promise<void>;
    handleProductTagStatus(request: any, id: string, dto: ChangeTagStatusDto): Promise<void>;
    deleteProductTag(request: any, t_id: string): Promise<void>;
    changeProductTagSortNo(request: any, dto: SortingDto): Promise<void>;
    addProduct(request: any, dto: AddProductDto): Promise<void>;
    getProducts(): Promise<{
        list: {
            id: any;
            product_name: any;
            product_type: any;
            product_tags: any;
            product_image: any;
            product_price: any;
            product_note: any;
            food_consumption_list: any;
            is_delete: any;
        }[];
    }>;
    getProduct(p_id: string): Promise<{
        id: any;
        product_name: string;
        product_type: number;
        product_tags: import("mongoose").FlattenMaps<import("../../../core/models/product-tags").ProductTags>;
        product_image: string;
        product_price: number;
        product_note: import("mongoose").FlattenMaps<import("../../../core/models/product-list/product-list.type").ProductNote>[];
        food_consumption_list: any;
    }>;
    updateProduct(request: any, p_id: string, dto: UpdateProductDto): Promise<void>;
    closeProduct(request: any, p_id: string): Promise<void>;
}
