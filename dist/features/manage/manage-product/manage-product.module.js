"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const middleware_1 = require("../../../common/middleware");
const food_item_1 = require("../../../core/models/food-item");
const product_list_1 = require("../../../core/models/product-list");
const product_tags_1 = require("../../../core/models/product-tags");
const manage_product_controller_1 = require("./manage-product.controller");
const manage_product_service_1 = require("./manage-product.service");
let ManageProductModule = class ManageProductModule {
    configure(consumer) {
        consumer
            .apply(middleware_1.AddProductMiddleware)
            .forRoutes({
            path: 'manage/product',
            method: common_1.RequestMethod.POST,
        })
            .apply(middleware_1.UpdateProductMiddleware)
            .forRoutes({
            path: 'manage/product/:p_id',
            method: common_1.RequestMethod.PUT,
        });
    }
};
ManageProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: product_tags_1.ProductTags.name,
                    schema: product_tags_1.ProductTagsSchema,
                },
                {
                    name: product_list_1.ProductList.name,
                    schema: product_list_1.ProductListSchema,
                },
                {
                    name: food_item_1.FoodItem.name,
                    schema: food_item_1.FoodItemSchema,
                },
            ]),
        ],
        controllers: [manage_product_controller_1.ManageProductController],
        providers: [manage_product_service_1.ManageProductService],
        exports: [manage_product_service_1.ManageProductService],
    })
], ManageProductModule);
exports.ManageProductModule = ManageProductModule;
//# sourceMappingURL=manage-product.module.js.map