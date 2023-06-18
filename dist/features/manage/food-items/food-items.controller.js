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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../common/guards");
const apiExample_1 = require("./apiExample");
const food_items_service_1 = require("./food-items.service");
let FoodItemsController = class FoodItemsController {
    constructor(foodItemsService) {
        this.foodItemsService = foodItemsService;
    }
    async getActivity() {
        return await this.foodItemsService.getFoodItemsList();
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得食材清單' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.getFoodItemsExample,
        },
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodItemsController.prototype, "getActivity", null);
FoodItemsController = __decorate([
    (0, swagger_1.ApiTags)('FoodItems'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('food-items'),
    __metadata("design:paramtypes", [food_items_service_1.FoodItemsService])
], FoodItemsController);
exports.FoodItemsController = FoodItemsController;
//# sourceMappingURL=food-items.controller.js.map