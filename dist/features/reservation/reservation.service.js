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
const time_1 = require("../../common/utils/time");
const validate_1 = require("../../common/utils/validate");
const order_1 = require("../../core/models/order");
const reservation_1 = require("../../core/models/reservation");
const table_main_1 = require("../../core/models/table-main");
let ReservationService = class ReservationService {
    constructor(reservationModel, tableMainModel, orderModel) {
        this.reservationModel = reservationModel;
        this.tableMainModel = tableMainModel;
        this.orderModel = orderModel;
    }
    async createReservation(dto, userId) {
        const targetReservation = Object.assign(Object.assign({}, dto), { status: reservation_1.ReservationStatus.WAIT, create_user: new mongoose_2.Types.ObjectId(userId) });
        return this.reservationModel.create(targetReservation);
    }
    async getReservationWaitList() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const query = this.reservationModel
            .find({
            status: reservation_1.ReservationStatus.WAIT,
            create_time: {
                $gte: today,
                $lt: tomorrow,
            },
        })
            .sort({ create_time: 1 });
        return query;
    }
    async changeReservationStatus(id, action, user, tableId, customerNum) {
        if (action === reservation_1.ReservationStatus.CANCEL) {
            (0, validate_1.validateObjectIds)({ id });
            const updatedReservation = await this.reservationModel.findOneAndUpdate({ _id: id, status: reservation_1.ReservationStatus.WAIT }, { status: action });
            if (!updatedReservation) {
                throw new common_1.BadRequestException('找不到此筆預約');
            }
        }
        else {
            (0, validate_1.validateObjectIds)({ id, table_id: tableId });
            if (!Number.isInteger(customerNum)) {
                throw new common_1.BadRequestException('用餐人數需為正整數');
            }
            if (customerNum <= 0) {
                throw new common_1.BadRequestException('用餐人數不得小於1');
            }
            const target_reservation = await this.reservationModel.findById(id).exec();
            if (!target_reservation) {
                throw new common_1.BadRequestException('找不到此筆預約');
            }
            if (target_reservation.status !== reservation_1.ReservationStatus.WAIT) {
                throw new common_1.BadRequestException(`此筆預約已處理過，狀態為${target_reservation.status}，無法安排入座`);
            }
            const checkIsToday = (0, time_1.isToday)(target_reservation.create_time);
            if (!checkIsToday) {
                throw new common_1.BadRequestException('此筆預約非今日預約，無法安排入座');
            }
            const table_main = await this.tableMainModel.findById(tableId).exec();
            if (!table_main || table_main.is_delete) {
                throw new common_1.BadRequestException('找不到此桌號');
            }
            if (table_main.status === table_main_1.TableStatus.MEAL) {
                throw new common_1.BadRequestException('此桌次為用餐中, 無法安排入座');
            }
            if (customerNum > table_main.seat_max + 2) {
                throw new common_1.BadRequestException(`預設可容納人數為 ${table_main.seat_max}, 實際人數可超過「預設可容納人數」最多兩位`);
            }
            const tableSession = await this.tableMainModel.db.startSession();
            const orderSession = await this.orderModel.db.startSession();
            const reservationSession = await this.reservationModel.db.startSession();
            tableSession.startTransaction();
            orderSession.startTransaction();
            reservationSession.startTransaction();
            try {
                await this.reservationModel.findOneAndUpdate({
                    _id: id,
                    status: reservation_1.ReservationStatus.WAIT,
                }, { status: action, customer_num: customerNum }, { session: reservationSession, new: true });
                const createdOrder = await this.orderModel.create([
                    {
                        table_main: new mongoose_2.Types.ObjectId(tableId),
                        customer_num: customerNum,
                        status: order_1.OrderStatus.IN_PROGRESS,
                        create_user: new mongoose_2.Types.ObjectId(user.id),
                    },
                ], {
                    session: orderSession,
                });
                await this.tableMainModel.findByIdAndUpdate(tableId, {
                    status: table_main_1.TableStatus.MEAL,
                    order: new mongoose_2.Types.ObjectId(createdOrder[0]._id),
                }, {
                    session: tableSession,
                });
                await tableSession.commitTransaction();
                await orderSession.commitTransaction();
                await reservationSession.commitTransaction();
            }
            catch (error) {
                await tableSession.abortTransaction();
                await orderSession.abortTransaction();
                await reservationSession.abortTransaction();
                throw error;
            }
            finally {
                tableSession.endSession();
                orderSession.endSession();
                reservationSession.endSession();
            }
        }
    }
};
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reservation_1.Reservation.name)),
    __param(1, (0, mongoose_1.InjectModel)(table_main_1.TableMain.name)),
    __param(2, (0, mongoose_1.InjectModel)(order_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map