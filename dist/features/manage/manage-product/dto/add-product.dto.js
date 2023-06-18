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
exports.AddProductDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '商品名稱', required: true, type: String }),
    (0, class_validator_1.IsString)({
        message: () => {
            throw new common_1.BadRequestException('product_name 需為字串');
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('product_name 不可為空');
        },
    }),
    __metadata("design:type", String)
], AddProductDto.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品類型',
        required: true,
        default: 0,
        type: Number,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('product_type 不可為空');
        },
    }),
    (0, class_validator_1.IsIn)([0, 1], {
        message: () => {
            throw new common_1.BadRequestException('product_type 必須為 0 或 1');
        },
    }),
    __metadata("design:type", Number)
], AddProductDto.prototype, "product_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品類別',
        type: String,
    }),
    (0, class_validator_1.IsString)({
        message: () => {
            throw new common_1.BadRequestException('product_tags 需為字串');
        },
    }),
    __metadata("design:type", String)
], AddProductDto.prototype, "product_tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品照片',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['https'],
        require_protocol: true,
    }, {
        message: () => {
            throw new common_1.BadRequestException('product_image 需為URL格式，並帶有https協議');
        },
    }),
    __metadata("design:type", String)
], AddProductDto.prototype, "product_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '商品價格',
        type: Number,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('product_price 不可為空');
        },
    }),
    (0, class_validator_1.IsInt)({
        message: () => {
            throw new common_1.BadRequestException('product_price 需為整數');
        },
    }),
    (0, class_validator_1.IsPositive)({
        message: () => {
            throw new common_1.BadRequestException('product_price 需為正數');
        },
    }),
    __metadata("design:type", Number)
], AddProductDto.prototype, "product_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '商品註記', required: true, type: [Object] }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('product_note 不可為空');
        },
    }),
    __metadata("design:type", Array)
], AddProductDto.prototype, "product_note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '食材消耗', required: true, type: [Object] }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('FoodConsumption 不可為空');
        },
    }),
    __metadata("design:type", Array)
], AddProductDto.prototype, "food_consumption_list", void 0);
exports.AddProductDto = AddProductDto;
//# sourceMappingURL=add-product.dto.js.map