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
exports.OrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../common/guards");
const order_detail_service_1 = require("./order-detail.service");
const create_order_detail_dto_1 = require("./dto/create-order-detail.dto");
const apiExample_1 = require("./apiExample");
const apiExample_2 = require("../../common/utils/apiExample");
let OrderDetailController = class OrderDetailController {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async postOrderDetail(orderId, orderDetail) {
        await this.orderDetailService.orderFlow(orderDetail, orderId);
    }
    async patchOrderDetail(orderId, detailId, pId) {
        await this.orderDetailService.patchOrderDetail(orderId, detailId, pId);
    }
    async deleteOrderDetail(orderId, detailId, pId) {
        await this.orderDetailService.deleteOrderDetail(orderId, detailId, pId);
    }
    async getOrderDetail(id) {
        return await this.orderDetailService.getOrderDetail(id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '送出餐點紀錄' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Post)('/:order_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_order_detail_dto_1.CreateOrderDetailDto]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "postOrderDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '單一餐點上菜' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Patch)('/:order_id/:detail_id/:p_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Param)('detail_id')),
    __param(2, (0, common_1.Param)('p_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "patchOrderDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '單一餐點退點' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Delete)('/:order_id/:detail_id/:p_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Param)('detail_id')),
    __param(2, (0, common_1.Param)('p_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "deleteOrderDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得此桌訂單紀錄' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.getOrderDetailExample,
        },
    }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getOrderDetail", null);
OrderDetailController = __decorate([
    (0, swagger_1.ApiTags)('OrderDetail'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('order-detail'),
    __metadata("design:paramtypes", [order_detail_service_1.OrderDetailService])
], OrderDetailController);
exports.OrderDetailController = OrderDetailController;
//# sourceMappingURL=order-detail.controller.js.map