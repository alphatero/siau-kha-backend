"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const food_group_1 = require("../../../core/models/food-group");
const food_item_1 = require("../../../core/models/food-item");
const food_items_controller_1 = require("./food-items.controller");
const food_items_service_1 = require("./food-items.service");
let FoodItemsModule = class FoodItemsModule {
};
FoodItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: food_item_1.FoodItem.name,
                    schema: food_item_1.FoodItemSchema,
                },
                {
                    name: food_group_1.FoodGroup.name,
                    schema: food_group_1.FoodGroupSchema,
                },
            ]),
        ],
        controllers: [food_items_controller_1.FoodItemsController],
        providers: [food_items_service_1.FoodItemsService],
    })
], FoodItemsModule);
exports.FoodItemsModule = FoodItemsModule;
//# sourceMappingURL=food-items.module.js.map