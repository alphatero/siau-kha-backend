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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_1 = require("../../core/models/activities");
const order_1 = require("../../core/models/order");
let OrderService = class OrderService {
    constructor(orderModel, activitiesModel) {
        this.orderModel = orderModel;
        this.activitiesModel = activitiesModel;
    }
    async updateOrderActivities(order_id, a_id, operate_type) {
        if (!mongoose_2.Types.ObjectId.isValid(order_id)) {
            throw new common_1.BadRequestException('order_id 格式錯誤');
        }
        if (!mongoose_2.Types.ObjectId.isValid(a_id)) {
            throw new common_1.BadRequestException('a_id 格式錯誤');
        }
        const order = await this.orderModel.findById(order_id).exec();
        if (!order) {
            throw new common_1.BadRequestException('找不到此筆訂單');
        }
        if (operate_type === 'DELETE' && !order.activities) {
            throw new common_1.BadRequestException('此訂單無加入優惠活動');
        }
        const activities = await this.activitiesModel.findById(a_id).exec();
        if (!activities) {
            throw new common_1.BadRequestException('找不到此優惠活動');
        }
        if (operate_type === 'CREATE') {
            return await this.orderModel.findByIdAndUpdate(order_id, {
                activities: new mongoose_2.Types.ObjectId(a_id),
            });
        }
        else if (operate_type === 'DELETE') {
            const check_id = order.activities['_id'];
            if (check_id.toString() !== a_id) {
                throw new common_1.BadRequestException('此訂單目前選擇的優惠活動與欲刪除的活動不同');
            }
            return await this.orderModel.findByIdAndUpdate(order_id, {
                $unset: { activities: '' },
            });
        }
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(activities_1.Activities.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map