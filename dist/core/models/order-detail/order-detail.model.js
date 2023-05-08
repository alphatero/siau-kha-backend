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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailSchema = exports.OrderDetail = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../order/order.model");
const product_detail_model_1 = require("../product-detail/product-detail.model");
const user_1 = require("../user");
const order_detail_type_1 = require("./order-detail.type");
let OrderDetail = class OrderDetail {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'order',
        required: true,
    }),
    __metadata("design:type", order_model_1.Order)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'ProductDetail',
        required: true,
    }),
    __metadata("design:type", product_detail_model_1.ProductDetail)
], OrderDetail.prototype, "product_detail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(order_detail_type_1.OrderDetailStatus),
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], OrderDetail.prototype, "create_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], OrderDetail.prototype, "create_time", void 0);
OrderDetail = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
        },
        versionKey: false,
    })
], OrderDetail);
exports.OrderDetail = OrderDetail;
const OrderDetailSchema = mongoose_1.SchemaFactory.createForClass(OrderDetail);
exports.OrderDetailSchema = OrderDetailSchema;
OrderDetailSchema.pre(/^find/, function (next) {
    this.populate('product_detail');
    next();
});
//# sourceMappingURL=order-detail.model.js.map