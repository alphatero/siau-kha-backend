"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_1 = require("../../core/models/order");
const check_out_controller_1 = require("./check-out.controller");
const check_out_service_1 = require("./check-out.service");
let CheckOutModule = class CheckOutModule {
};
CheckOutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: order_1.Order.name,
                    schema: order_1.OrderSchema,
                },
            ]),
        ],
        controllers: [check_out_controller_1.CheckOutController],
        providers: [check_out_service_1.CheckOutService],
    })
], CheckOutModule);
exports.CheckOutModule = CheckOutModule;
//# sourceMappingURL=check-out.module.js.map