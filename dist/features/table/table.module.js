"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const activities_1 = require("../../core/models/activities");
const order_1 = require("../../core/models/order");
const order_detail_model_1 = require("../../core/models/order-detail/order-detail.model");
const product_detail_1 = require("../../core/models/product-detail");
const table_main_1 = require("../../core/models/table-main");
const table_controller_1 = require("./table.controller");
const table_service_1 = require("./table.service");
let TableModule = class TableModule {
};
TableModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: table_main_1.TableMain.name,
                    schema: table_main_1.TableMainSchema,
                },
                {
                    name: order_1.Order.name,
                    schema: order_1.OrderSchema,
                },
                {
                    name: order_detail_model_1.OrderDetail.name,
                    schema: order_detail_model_1.OrderDetailSchema,
                },
                {
                    name: product_detail_1.ProductDetail.name,
                    schema: product_detail_1.ProductDetailSchema,
                },
                {
                    name: activities_1.Activities.name,
                    schema: activities_1.ActivitiesSchema,
                },
            ]),
        ],
        controllers: [table_controller_1.TableController],
        providers: [table_service_1.TableService],
        exports: [table_service_1.TableService],
    })
], TableModule);
exports.TableModule = TableModule;
//# sourceMappingURL=table.module.js.map