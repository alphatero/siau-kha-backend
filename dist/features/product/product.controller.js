"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const create_product_tag_dto_1 = require("./dto/create-product-tag.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProductTags() {
        const documents = await this.productService.getProductTags();
        const product_tags = documents.map((doc) => {
            const { _id, tag_name, sort_no } = doc.toJSON();
            return {
                id: _id,
                tag_name,
                sort_no,
            };
        });
        return { product_tags };
    }
    async createTable(request, dto) {
        const { user } = request;
        return await this.productService.createProductTag(dto, user);
    }
    async getProductList(tag_id, product_name) {
        const documents = await this.productService.getProducts({
            tag_id,
            product_name,
        });
        const product_list = documents.map((doc) => {
            const { _id, product_name, product_type, product_tags, product_image, product_price, } = doc.toJSON();
            return {
                id: _id,
                product_name,
                product_type,
                product_tags,
                product_image,
                product_price,
            };
        });
        return { product_list };
    }
    async getProduct(id) {
        const product = await this.productService.getProduct({ id });
        return { product };
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得所有商品類別' }),
    (0, common_1.Get)('/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductTags", null);
__decorate([
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/tags'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_tag_dto_1.CreateProductTagDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createTable", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得單一類別商品列表' }),
    (0, swagger_1.ApiQuery)({ name: 'tag_id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'product_name', required: false }),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)('tag_id')),
    __param(1, (0, common_1.Query)('product_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得單一商品資訊' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)('Product'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map