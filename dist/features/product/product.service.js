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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_list_1 = require("../../core/models/product-list");
const product_tags_1 = require("../../core/models/product-tags");
let ProductService = class ProductService {
    constructor(productTagsModel, productListModel) {
        this.productTagsModel = productTagsModel;
        this.productListModel = productListModel;
    }
    async getProductTags(filters) {
        const query = this.productTagsModel.find(filters);
        return query;
    }
    async createProductTag(dto, user) {
        const { tag_name, sort_no } = dto;
        return this.productTagsModel.create({
            tag_name,
            create_user: new mongoose_2.Types.ObjectId(user.id),
            set_state_time: new Date(),
            set_state_user: new mongoose_2.Types.ObjectId(user.id),
            sort_no: sort_no,
        });
    }
    async getProducts(filters) {
        const filter = {};
        if (filters === null || filters === void 0 ? void 0 : filters.tag_id) {
            if (!mongoose_2.Types.ObjectId.isValid(filters.tag_id)) {
                throw new common_1.BadRequestException('tag_id 格式錯誤');
            }
            filter.product_tags = new mongoose_2.Types.ObjectId(filters.tag_id);
        }
        if (filters === null || filters === void 0 ? void 0 : filters.product_name) {
            filter.product_name = new RegExp(filters.product_name);
        }
        console.log(filter);
        const query = this.productListModel.find(filter);
        return query;
    }
    async getProduct(filters) {
        console.log(filters);
        if (!mongoose_2.Types.ObjectId.isValid(filters.id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        return this.productListModel
            .findOne({ _id: new mongoose_2.Types.ObjectId(filters.id) })
            .exec();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_tags_1.ProductTags.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_list_1.ProductList.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map