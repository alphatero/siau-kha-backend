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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reservation_service_1 = require("./reservation.service");
const guards_1 = require("../../common/guards");
const check_in_reservation_dto_1 = require("./dto/check-in-reservation.dto");
const reservation_1 = require("../../core/models/reservation");
const apiExample_1 = require("./apiExample");
const apiExample_2 = require("../../common/utils/apiExample");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async createReservation(request, dto) {
        const { user } = request;
        await this.reservationService.createReservation(dto, user.id);
    }
    async getReservation() {
        return await this.reservationService.getReservationWaitList();
    }
    async arrangeSeating(request, id, tableId, customerNum) {
        const { user } = request;
        await this.reservationService.changeReservationStatus(id, reservation_1.ReservationStatus.SUCCESS, user, tableId, customerNum);
    }
    async deleteReservation(id) {
        await this.reservationService.changeReservationStatus(id, reservation_1.ReservationStatus.CANCEL);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '登記候位' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_in_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取得所有候位中的清單' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.getReservationWaitListExample,
        },
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservation", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '安排入座' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Patch)('/:id/:table_id/:customer_num'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('table_id')),
    __param(3, (0, common_1.Param)('customer_num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "arrangeSeating", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '取消候位' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteReservation", null);
ReservationController = __decorate([
    (0, swagger_1.ApiTags)('Reservation'),
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map