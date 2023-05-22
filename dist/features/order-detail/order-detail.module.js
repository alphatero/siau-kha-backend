"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_detail_service_1 = require("./order-detail.service");
const order_detail_controller_1 = require("./order-detail.controller");
const product_detail_1 = require("../../core/models/product-detail");
const order_1 = require("../../core/models/order");
const order_detail_1 = require("../../core/models/order-detail");
const product_list_1 = require("../../core/models/product-list");
const activities_1 = require("../../core/models/activities");
let OrderDetailModule = class OrderDetailModule {
};
OrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: order_1.Order.name,
                    schema: order_1.OrderSchema,
                },
                {
                    name: order_detail_1.OrderDetail.name,
                    schema: order_detail_1.OrderDetailSchema,
                },
                {
                    name: product_detail_1.ProductDetail.name,
                    schema: product_detail_1.ProductDetailSchema,
                },
                {
                    name: product_list_1.ProductList.name,
                    schema: product_list_1.ProductListSchema,
                },
                {
                    name: activities_1.Activities.name,
                    schema: activities_1.ActivitiesSchema,
                },
            ]),
        ],
        providers: [order_detail_service_1.OrderDetailService],
        controllers: [order_detail_controller_1.OrderDetailController],
        exports: [order_detail_service_1.OrderDetailService],
    })
], OrderDetailModule);
exports.OrderDetailModule = OrderDetailModule;
//# sourceMappingURL=order-detail.module.js.map