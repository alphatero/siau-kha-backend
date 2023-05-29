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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrderActivities(order_id, a_id) {
        await this.orderService.updateOrderActivities(order_id, a_id, 'CREATE');
    }
    async deleteOrderActivities(order_id, a_id) {
        await this.orderService.updateOrderActivities(order_id, a_id, 'DELETE');
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '新增訂單優惠活動' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                status: 'success',
                message: '成功',
            },
        },
    }),
    (0, common_1.Post)('/:order_id/:a_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Param)('a_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrderActivities", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '刪除訂單優惠活動' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                status: 'success',
                message: '成功',
            },
        },
    }),
    (0, common_1.Delete)('/:order_id/:a_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Param)('a_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrderActivities", null);
OrderController = __decorate([
    (0, swagger_1.ApiTags)('Order'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map