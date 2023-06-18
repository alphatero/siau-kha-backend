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
exports.CheckOutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_1 = require("../../core/models/order");
let CheckOutService = class CheckOutService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async checkOut(id, final_price) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const orderRes = await this.orderModel.findById(id);
        if (!orderRes) {
            throw new common_1.BadRequestException('無此訂單');
        }
        if (orderRes.status === order_1.OrderStatus.SUCCESS) {
            throw new common_1.BadRequestException('此桌訂單已清理完成,並釋出桌位');
        }
        if (orderRes.is_pay) {
            throw new common_1.BadRequestException('此訂單已結帳');
        }
        if (!Number.isInteger(final_price) || final_price < 0) {
            throw new common_1.BadRequestException('實收金額應為正整數');
        }
        if (final_price !== orderRes.final_total) {
            throw new common_1.BadRequestException(`實收金額與應收金額不符；實收金額:${final_price}，應收金額:${orderRes.final_total}`);
        }
        await this.orderModel.findByIdAndUpdate(id, { is_pay: true }, { new: true });
    }
    async getCheckOutInfo(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('id 格式錯誤');
        }
        const orderRes = await this.orderModel.findById(id);
        if (!orderRes) {
            throw new common_1.BadRequestException('查無此訂單');
        }
        if (orderRes.status !== order_1.OrderStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException('此桌訂單已清理完成,並釋出桌位');
        }
        if (orderRes.is_pay) {
            throw new common_1.BadRequestException('此訂單已結帳');
        }
        if (orderRes.order_detail.length === 0) {
            throw new common_1.BadRequestException('此訂單沒有可以結帳的訂單項目');
        }
        const productListObj = {};
        let validTotal = 0;
        let finalTotal = 0;
        orderRes.order_detail.forEach((detail) => {
            detail.product_detail.forEach((product) => {
                if (product.is_delete === false) {
                    if (productListObj[product.product_id]) {
                        productListObj[product.product_id].product_quantity =
                            productListObj[product.product_id].product_quantity +
                                product.product_quantity;
                        productListObj[product.product_id].product_price =
                            product.product_price;
                    }
                    else {
                        productListObj[product.product_id] = {
                            product_name: product.product_name,
                            product_price: product.product_price,
                            product_quantity: product.product_quantity,
                        };
                    }
                }
            });
        });
        const order_detail_list = Object.values(productListObj).map((product) => {
            const { product_name, product_price, product_quantity } = product;
            const product_final_price = product_price * product_quantity;
            validTotal = validTotal + product_final_price;
            return {
                product_name,
                product_price,
                product_quantity,
                product_final_price,
            };
        });
        if (orderRes.activities) {
            finalTotal = this.calActivityDiscount(productListObj, validTotal, orderRes.activities);
        }
        else {
            finalTotal = validTotal;
        }
        const activity_charge = finalTotal - validTotal;
        const service_charge = finalTotal * 0.1;
        finalTotal = finalTotal + service_charge;
        await this.orderModel
            .findByIdAndUpdate(id, { final_total: finalTotal }, { new: true })
            .exec();
        const order = {
            customer_num: orderRes.customer_num,
            total: validTotal,
            final_total: finalTotal,
            service_charge: service_charge,
            order_detail: order_detail_list,
            activities: orderRes.activities
                ? {
                    activities_name: orderRes.activities.activities_name,
                    discount_type: orderRes.activities.discount_type,
                    charge_type: orderRes.activities.charge_type,
                    activity_charge: activity_charge,
                }
                : {},
        };
        return { order };
    }
    calActivityDiscount(validObj, validTotal, activities) {
        let finalTotal = 0;
        switch (activities.discount_type) {
            case '0':
                if (activities.charge_type === '0') {
                    finalTotal = validTotal * ((100 - activities.discount) / 100);
                }
                else {
                    finalTotal = validTotal - activities.discount;
                }
                break;
            case '1':
                let needMinus = 0;
                activities.act_products_list.forEach((act_product) => {
                    if (validObj[act_product]) {
                        if (activities.charge_type === '0') {
                            needMinus =
                                needMinus +
                                    validObj[act_product].product_price *
                                        (activities.discount / 100);
                        }
                        else {
                            needMinus = needMinus + activities.discount;
                        }
                    }
                });
                finalTotal = validTotal - needMinus;
                break;
            default:
                break;
        }
        return finalTotal;
    }
};
CheckOutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CheckOutService);
exports.CheckOutService = CheckOutService;
//# sourceMappingURL=check-out.service.js.map