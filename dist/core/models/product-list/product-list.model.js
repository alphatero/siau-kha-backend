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
exports.ProductListSchema = exports.ProductList = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_tags_1 = require("../product-tags");
const user_1 = require("../user");
let ProductList = class ProductList {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductList.prototype, "product_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['0', '1'],
    }),
    __metadata("design:type", String)
], ProductList.prototype, "product_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'ProductTags',
    }),
    __metadata("design:type", product_tags_1.ProductTags)
], ProductList.prototype, "product_tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductList.prototype, "product_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductList.prototype, "product_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: (Array),
    }),
    __metadata("design:type", Array)
], ProductList.prototype, "product_note", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ProductList.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], ProductList.prototype, "create_user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductList.prototype, "is_delete", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ProductList.prototype, "set_state_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_1.User)
], ProductList.prototype, "set_state_user", void 0);
ProductList = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'set_state_time',
        },
        versionKey: false,
    })
], ProductList);
exports.ProductList = ProductList;
exports.ProductListSchema = mongoose_1.SchemaFactory.createForClass(ProductList);
//# sourceMappingURL=product-list.model.js.map