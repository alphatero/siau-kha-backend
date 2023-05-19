"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reservation_1 = require("../../core/models/reservation");
const reservation_controller_1 = require("./reservation.controller");
const reservation_service_1 = require("./reservation.service");
const order_1 = require("../../core/models/order");
const table_main_1 = require("../../core/models/table-main");
let ReservationModule = class ReservationModule {
};
ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: reservation_1.Reservation.name,
                    schema: reservation_1.ReservationSchema,
                },
                {
                    name: table_main_1.TableMain.name,
                    schema: table_main_1.TableMainSchema,
                },
                {
                    name: order_1.Order.name,
                    schema: order_1.OrderSchema,
                },
            ]),
        ],
        controllers: [reservation_controller_1.ReservationController],
        providers: [reservation_service_1.ReservationService],
    })
], ReservationModule);
exports.ReservationModule = ReservationModule;
//# sourceMappingURL=reservation.module.js.map