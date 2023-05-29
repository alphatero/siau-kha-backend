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
exports.ProductDetailSchema = exports.ProductDetail = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const product_detail_type_1 = require("./product-detail.type");
let ProductDetail = class ProductDetail {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "order_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "product_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductDetail.prototype, "product_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "product_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "product_quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: (Array),
        default: [],
    }),
    __metadata("design:type", Array)
], ProductDetail.prototype, "product_note", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductDetail.prototype, "product_final_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(product_detail_type_1.ProductDetailStatus),
    }),
    __metadata("design:type", String)
], ProductDetail.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductDetail.prototype, "is_delete", void 0);
ProductDetail = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], ProductDetail);
exports.ProductDetail = ProductDetail;
exports.ProductDetailSchema = mongoose_1.SchemaFactory.createForClass(ProductDetail);
//# sourceMappingURL=product-detail.model.js.map