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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_1 = require("../activities");
const table_main_1 = require("../table-main");
const user_1 = require("../user");
const order_type_1 = require("./order.type");
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'TableMain',
        required: true,
    }),
    __metadata("design:type", table_main_1.TableMain)
], Order.prototype, "table_main", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Order.prototype, "customer_num", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], Order.prototype, "final_total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "is_pay", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(order_type_1.OrderStatus),
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], Order.prototype, "create_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Order.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Order.prototype, "updated_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'OrderDetail',
    }),
    __metadata("design:type", Array)
], Order.prototype, "order_detail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'Activities',
    }),
    __metadata("design:type", activities_1.Activities)
], Order.prototype, "activities", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'updated_time',
        },
        versionKey: false,
    })
], Order);
exports.Order = Order;
const OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
exports.OrderSchema = OrderSchema;
OrderSchema.pre(/^find/, function (next) {
    this.populate('order_detail').populate('activities');
    next();
});
//# sourceMappingURL=order.model.js.map