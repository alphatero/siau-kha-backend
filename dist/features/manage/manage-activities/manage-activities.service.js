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
exports.ManageActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_1 = require("../../../core/models/activities");
const product_list_1 = require("../../../core/models/product-list");
const validate_1 = require("../../../common/utils/validate");
let ManageActivitiesService = class ManageActivitiesService {
    constructor(activitiesModel, productListModel) {
        this.activitiesModel = activitiesModel;
        this.productListModel = productListModel;
    }
    async getActivitiesList(isManagement) {
        const actQueryFilter = isManagement
            ? {
                is_delete: false,
            }
            : {
                status: true,
                is_delete: false,
            };
        const query = await this.activitiesModel.find(actQueryFilter).populate({
            path: 'act_products_list',
            select: '_id product_name product_type product_price',
        });
        const activities = query.map((doc) => {
            const activity = doc.toJSON();
            return {
                id: activity._id,
                activities_name: activity.activities_name,
                discount_type: activity.discount_type,
                charge_type: activity.charge_type,
                min_spend: activity.min_spend,
                discount: activity.discount,
                is_period: activity.is_period,
                start_time: activity.start_time,
                end_time: activity.end_time,
                act_products_list: activity.act_products_list.map((product) => ({
                    id: product._id,
                    product_name: product.product_name,
                    product_type: product.product_type,
                    product_price: product.product_price,
                })),
                status: activity.status,
            };
        });
        return { act_list: activities };
    }
    async createActivities(dto) {
        const productIds = dto.act_products_list.map((productId) => ({
            productId,
        }));
        if (productIds.length > 0) {
            (0, validate_1.validateObjectIds)({
                productIds,
            });
        }
        const products = await this.productListModel.find({
            _id: { $in: dto.act_products_list },
        });
        if (products.length !== dto.act_products_list.length) {
            const notFoundIds = dto.act_products_list.filter((id) => !products.map((p) => p._id).includes(id));
            throw new common_1.BadRequestException(`找不到此商品ID: ${notFoundIds.join(',')}`);
        }
        const createActivities = Object.assign(Object.assign({}, dto), { status: true, is_delete: false });
        return this.activitiesModel.create(createActivities);
    }
    async updateActivities(actId, dto) {
        (0, validate_1.validateObjectIds)({ actId });
        const updateDto = Object.assign(Object.assign({}, dto), (dto.act_products_list &&
            dto.act_products_list.length > 0 && {
            $addToSet: { act_products_list: dto.act_products_list },
        }));
        const products = await this.productListModel.find({
            _id: { $in: dto.act_products_list },
        });
        if (dto.act_products_list &&
            dto.act_products_list.length !== products.length) {
            const notFoundIds = dto.act_products_list.filter((id) => !products.map((p) => p._id).includes(id));
            throw new common_1.BadRequestException(`找不到此產品ID: ${notFoundIds.join(',')}`);
        }
        const updatedActivity = await this.activitiesModel.findByIdAndUpdate(actId, updateDto, { new: true });
        if (!updatedActivity) {
            throw new common_1.BadRequestException(`找不到此活動ID: ${actId}`);
        }
        return updatedActivity;
    }
    async deleteActivities(actId) {
        (0, validate_1.validateObjectIds)({ actId });
        const updatedActivity = await this.activitiesModel.findByIdAndUpdate(actId, {
            is_delete: true,
        }, { new: true });
        if (!updatedActivity) {
            throw new common_1.BadRequestException(`找不到此活動ID: ${actId}`);
        }
    }
};
ManageActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activities_1.Activities.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_list_1.ProductList.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ManageActivitiesService);
exports.ManageActivitiesService = ManageActivitiesService;
//# sourceMappingURL=manage-activities.service.js.map