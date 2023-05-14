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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reservation_1 = require("../../core/models/reservation");
let ReservationService = class ReservationService {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }
    async createReservation(dto, userId) {
        const targetReservation = Object.assign(Object.assign({}, dto), { status: reservation_1.ReservationStatus.WAIT, create_user: new mongoose_2.Types.ObjectId(userId) });
        return this.reservationModel.create(targetReservation);
    }
    async getReservationWaitList() {
        const query = this.reservationModel
            .find({
            status: reservation_1.ReservationStatus.WAIT,
        })
            .sort({ create_time: 1 });
        return query;
    }
    async changeReservationStatus(id, action) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('tag_id 格式錯誤');
        }
        const updatedReservation = await this.reservationModel.findOneAndUpdate({ _id: id, status: reservation_1.ReservationStatus.WAIT }, { status: action });
        if (!updatedReservation) {
            throw new common_1.BadRequestException('找不到此筆預約');
        }
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reservation_1.Reservation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map