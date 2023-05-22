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
const namespace = gateways_1.GATEWAY_NAMESPACE.ORDER_PRODUCT_DETAILS;
let OrderSocketGateway = class OrderSocketGateway {
    handleMessage(body) {
        this.server.emit('onOrder', Object.assign({}, body));
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OrderSocketGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseFilters)(ws_exception_filter_1.WebSocketExceptionFilter),
    (0, common_1.UsePipes)(new pipes_1.WSValidationPipe()),
    (0, websockets_1.SubscribeMessage)(namespace),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [table_data_dto_1.TableDataDto]),
    __metadata("design:returntype", void 0)
], OrderSocketGateway.prototype, "handleMessage", null);
OrderSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(gateways_1.gatewayPort[namespace], {
        namespace,
        cors: {
            origin: Object.values(gateways_1.corsOrigin),
        },
    })
], OrderSocketGateway);
exports.OrderSocketGateway = OrderSocketGateway;
//# sourceMappingURL=order-socket.gateway.js.map