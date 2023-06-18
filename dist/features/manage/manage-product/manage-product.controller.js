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
exports.ManageProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../common/guards");
const apiExample_1 = require("../../../common/utils/apiExample");
const apiExample_2 = require("./apiExample");
const dto_1 = require("./dto");
const manage_product_service_1 = require("./manage-product.service");
let ManageProductController = class ManageProductController {
    constructor(manageProductService) {
        this.manageProductService = manageProductService;
    }
    async getProductTags() {
        return await this.manageProductService.getProductTags();
    }
    async createProductTag(request, dto) {
        const { user } = request;
        return await this.manageProductService.createProductTag(dto, user);
    }
    async editProductTag(request, id, dto) {
        const { user } = request;
        return await this.manageProductService.editProductTag(dto, id, user);
    }
    async handleProductTagStatus(request, id, dto) {
        const { user } = request;
        return await this.manageProductService.handleProductTagStatus(dto, id, user);
    }
    async deleteProductTag(request, t_id) {
        const { user } = request;
        return await this.manageProductService.deleteProductTag(t_id, user);
    }
    async changeProductTagSortNo(request, dto) {
        const { user } = request;
        return await this.manageProductService.changeProductTagSortNo(dto, user);
    }
    async addProduct(request, dto) {
        const { user, middle_data } = request;
        return await this.manageProductService.addProduct(dto, user, middle_data);
    }
    async getProducts() {
        return await this.manageProductService.getProducts();
    }
    async getProduct(p_id) {
        return await this.manageProductService.getProduct(p_id);
    }
    async updateProduct(request, p_id, dto) {
        const { user, middle_data } = request;
        return await this.manageProductService.updateProduct(dto, user, middle_data, p_id);
    }
    async closeProduct(request, p_id) {
        const { user } = request;
        return await this.manageProductService.closeProduct(p_id, user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-取得所有商品類別' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.getTagsExample,
        },
    }),
    (0, common_1.Get)('/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "getProductTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-新增商品類別' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Post)('/tag'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AddTagDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "createProductTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-編輯商品類別' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Patch)('/:t_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('t_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.AddTagDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "editProductTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-編輯商品類別狀態' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Patch)('/tags/status/:t_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('t_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.ChangeTagStatusDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "handleProductTagStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-刪除商品類別' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Delete)('/:t_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('t_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "deleteProductTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-調整商品類別排序' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Patch)('/tags/sorting'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SortingDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "changeProductTagSortNo", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-新增商品' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AddProductDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "addProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-取得商品' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.getProductListExample,
        },
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "getProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-取得單一商品' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: 'p_id',
        description: '商品id',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.getProductExample,
        },
    }),
    (0, common_1.Get)('/:p_id'),
    __param(0, (0, common_1.Param)('p_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "getProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-編輯商品' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Put)('/:p_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('p_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理端-刪除商品類別' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.basicExample,
        },
    }),
    (0, common_1.Patch)('/:p_id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('p_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManageProductController.prototype, "closeProduct", null);
ManageProductController = __decorate([
    (0, swagger_1.ApiTags)('ManageProduct'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('manage/product'),
    __metadata("design:paramtypes", [manage_product_service_1.ManageProductService])
], ManageProductController);
exports.ManageProductController = ManageProductController;
//# sourceMappingURL=manage-product.controller.js.map