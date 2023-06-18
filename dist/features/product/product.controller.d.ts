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
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductTags(): Promise<{
        product_tags: {
            id: any;
            tag_name: string;
            sort_no: number;
        }[];
    }>;
    createTable(request: any, dto: CreateProductTagDto): Promise<import("mongoose").Document<unknown, {}, import("../../core/models/product-tags").ProductTagsDocument> & Omit<import("../../core/models/product-tags").ProductTags & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getProductList(tag_id: any, product_name: any): Promise<{
        product_list: {
            id: any;
            product_name: string;
            product_type: number;
            product_tags: import("mongoose").FlattenMaps<import("../../core/models/product-tags").ProductTags>;
            product_image: string;
            product_price: number;
            product_note: import("mongoose").FlattenMaps<import("../../core/models/product-list/product-list.type").ProductNote>[];
        }[];
    }>;
    getProduct(id: string): Promise<{
        product: {
            id: any;
            product_name: string;
            product_type: number;
            product_tags: import("../../core/models/product-tags").ProductTags;
            product_price: number;
            product_note: import("../../core/models/product-list/product-list.type").ProductNote[];
        };
    }>;
}
