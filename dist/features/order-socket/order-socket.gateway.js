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
exports.OrderSocketGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const table_data_dto_1 = require("./dto/table-data.dto");
const pipes_1 = require("../../common/pipes");
const ws_exception_filter_1 = require("../../common/filters/websocket/ws-exception.filter");
const gateways_1 = require("../../core/gateways");
const order_detail_1 = require("../order-detail");
const update_product_detail_dto_1 = require("./dto/update-product-detail.dto");
const delete_product_detail_dto_1 = require("./dto/delete-product-detail.dto");
const product_detail_1 = require("../../core/models/product-detail");
const namespace = gateways_1.GATEWAY_NAMESPACE.ORDER;
let OrderSocketGateway = class OrderSocketGateway {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async onOrder(body) {
        const product_detail = body.product_detail.map((item) => {
            return {
                product_id: item.product_id,
                product_quantity: item.product_quantity,
                product_note: item.product_note,
            };
        });
        const orderDetailDto = {
            product_detail,
        };
        await this.orderDetailService.orderFlow(orderDetailDto, body.order_id);
        this.server.emit('onOrder', Object.assign({}, body));
    }
    async onUpdateProductDetail(body) {
        await this.orderDetailService.patchOrderDetail(body.order_id, body.detail_id, body.p_id, product_detail_1.ProductDetailStatus.FINISH);
        this.server.emit('onUpdateProductDetail', Object.assign({}, body));
    }
    async onDeleteProductDetail(body) {
        await this.orderDetailService.deleteOrderDetail(body.order_id, body.detail_id, body.p_id);
        this.server.emit('onDeleteProductDetail', Object.assign({}, body));
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.server.emit('order connected', { userId: client.id });
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.server.emit('order disconnected', {
            userId: client.id,
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OrderSocketGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseFilters)(ws_exception_filter_1.WebSocketExceptionFilter),
    (0, common_1.UsePipes)(new pipes_1.WSValidationPipe()),
    (0, websockets_1.SubscribeMessage)(gateways_1.SUBSCRIBE.ORDER_PRODUCT_DETAILS),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_data_dto_1.TableDataDto]),
    __metadata("design:returntype", Promise)
], OrderSocketGateway.prototype, "onOrder", null);
__decorate([
    (0, common_1.UseFilters)(ws_exception_filter_1.WebSocketExceptionFilter),
    (0, common_1.UsePipes)(new pipes_1.WSValidationPipe()),
    (0, websockets_1.SubscribeMessage)(gateways_1.SUBSCRIBE.UPDATE_PRODUCT_DETAILS),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_detail_dto_1.UpdateProductDetailDto]),
    __metadata("design:returntype", Promise)
], OrderSocketGateway.prototype, "onUpdateProductDetail", null);
__decorate([
    (0, common_1.UseFilters)(ws_exception_filter_1.WebSocketExceptionFilter),
    (0, common_1.UsePipes)(new pipes_1.WSValidationPipe()),
    (0, websockets_1.SubscribeMessage)(gateways_1.SUBSCRIBE.DELETE_PRODUCT_DETAILS),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_product_detail_dto_1.DeleteProductDetailDto]),
    __metadata("design:returntype", Promise)
], OrderSocketGateway.prototype, "onDeleteProductDetail", null);
OrderSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace,
        cors: {
            origin: Object.values(gateways_1.corsOrigin),
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_detail_1.OrderDetailService])
], OrderSocketGateway);
exports.OrderSocketGateway = OrderSocketGateway;
//# sourceMappingURL=order-socket.gateway.js.map