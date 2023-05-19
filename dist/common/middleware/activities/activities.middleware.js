"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ActivitiesMiddleware = class ActivitiesMiddleware {
    use(req, _, next) {
        const reqBody = req.body;
        if (!Array.isArray(reqBody.act_products_list)) {
            throw new common_1.BadRequestException('act_products_list 必須為陣列');
        }
        if (reqBody.discount_type === '0') {
            if (reqBody.act_products_list.length > 0) {
                throw new common_1.BadRequestException('全單優惠不需要指定商品');
            }
        }
        else if (reqBody.discount_type === '1') {
            if (reqBody.act_products_list.length === 0) {
                throw new common_1.BadRequestException('指定商品優惠活動需要指定商品');
            }
        }
        else {
            throw new common_1.BadRequestException('計算類別只能為 0 或 1');
        }
        if (reqBody.charge_type === '0') {
            if (!reqBody.discount) {
                throw new common_1.BadRequestException('折扣類型需要設定折扣');
            }
            if (reqBody.discount < 1 || reqBody.discount > 100) {
                throw new common_1.BadRequestException('折扣需介於 1~100 之間');
            }
        }
        else if (reqBody.charge_type === '1') {
            if (!reqBody.discount) {
                throw new common_1.BadRequestException('折讓類型需要設定折讓金額');
            }
            if (reqBody.discount < 1) {
                throw new common_1.BadRequestException('折讓金額需大於 0');
            }
        }
        else {
            throw new common_1.BadRequestException('計算類型只能為 0 或 1');
        }
        if (reqBody.is_period) {
            const start_time = new Date(reqBody.start_time);
            const end_time = new Date(reqBody.end_time);
            if (end_time < new Date()) {
                throw new common_1.BadRequestException('結束時間不能早於現在時間');
            }
            if (end_time < start_time) {
                throw new common_1.BadRequestException('結束時間不能早於開始時間');
            }
        }
        next();
    }
};
ActivitiesMiddleware = __decorate([
    (0, common_1.Injectable)()
], ActivitiesMiddleware);
exports.ActivitiesMiddleware = ActivitiesMiddleware;
//# sourceMappingURL=activities.middleware.js.map