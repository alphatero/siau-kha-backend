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
exports.FoodItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const food_item_1 = require("../../../core/models/food-item");
let FoodItemsService = class FoodItemsService {
    constructor(foodItemModel) {
        this.foodItemModel = foodItemModel;
    }
    async getFoodItemsList() {
        const documents = await this.foodItemModel.find({
            is_delete: false,
        });
        const foodItems = documents.map((doc) => {
            const foodItem = doc.toJSON();
            return {
                id: foodItem._id,
                food_items_name: foodItem.food_items_name,
                group: foodItem.group,
                purchase_cost: foodItem.purchase_cost,
                item_stock: foodItem.item_stock,
                safety_stock: foodItem.safety_stock,
                status: foodItem.status,
                units: foodItem.units,
            };
        });
        return { foodItems };
    }
};
FoodItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(food_item_1.FoodItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FoodItemsService);
exports.FoodItemsService = FoodItemsService;
//# sourceMappingURL=food-items.service.js.map