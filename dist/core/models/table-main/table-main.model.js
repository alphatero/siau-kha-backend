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
exports.TableMainSchema = exports.TableMain = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_model_1 = require("../order/order.model");
const table_main_type_1 = require("./table-main.type");
let TableMain = class TableMain {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TableMain.prototype, "table_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        default: 0,
    }),
    __metadata("design:type", Number)
], TableMain.prototype, "seat_max", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(table_main_type_1.TableStatus),
    }),
    __metadata("design:type", String)
], TableMain.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TableMain.prototype, "is_delete", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'Order',
        required: false,
    }),
    __metadata("design:type", order_model_1.Order)
], TableMain.prototype, "order", void 0);
TableMain = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
    })
], TableMain);
exports.TableMain = TableMain;
const TableMainSchema = mongoose_1.SchemaFactory.createForClass(TableMain);
exports.TableMainSchema = TableMainSchema;
TableMainSchema.pre(/^find/, function (next) {
    this.populate('order');
    next();
});
//# sourceMappingURL=table-main.model.js.map