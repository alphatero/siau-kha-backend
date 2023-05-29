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
exports.ProductTagsSchema = exports.ProductTags = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_1 = require("../user");
const product_tags_type_1 = require("./product-tags.type");
let ProductTags = class ProductTags {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductTags.prototype, "tag_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_1.User)
], ProductTags.prototype, "create_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ProductTags.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(product_tags_type_1.ProductTagStatus),
        default: product_tags_type_1.ProductTagStatus.ENABLE,
    }),
    __metadata("design:type", String)
], ProductTags.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ProductTags.prototype, "set_state_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", user_1.User)
], ProductTags.prototype, "set_state_user", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], ProductTags.prototype, "sort_no", void 0);
ProductTags = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'set_state_time',
        },
        versionKey: false,
    })
], ProductTags);
exports.ProductTags = ProductTags;
exports.ProductTagsSchema = mongoose_1.SchemaFactory.createForClass(ProductTags);
//# sourceMappingURL=product-tags.model.js.map