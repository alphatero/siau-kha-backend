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
exports.CreateOrderDetailDto = exports.ProductDetailInOrderDetail = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProductDetailInOrderDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: '商品 id',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDetailInOrderDetail.prototype, "product_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '商品數量', example: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, {
        message: () => {
            throw new common_1.BadRequestException('product_quantity 不得小於 1');
        },
    }),
    __metadata("design:type", Number)
], ProductDetailInOrderDetail.prototype, "product_quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], description: '商品註記', example: ['去冰'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductDetailInOrderDetail.prototype, "product_note", void 0);
exports.ProductDetailInOrderDetail = ProductDetailInOrderDetail;
class CreateOrderDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProductDetailInOrderDetail], description: '商品詳情' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDetailInOrderDetail),
    __metadata("design:type", Array)
], CreateOrderDetailDto.prototype, "product_detail", void 0);
exports.CreateOrderDetailDto = CreateOrderDetailDto;
//# sourceMappingURL=create-order-detail.dto.js.map