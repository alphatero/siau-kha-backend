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
exports.CreateReservationDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateReservationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '顧客姓名', required: true }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('name 不可為空');
        },
    }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手機號碼', required: true }),
    (0, class_validator_1.IsPhoneNumber)('TW', {
        message: () => {
            throw new common_1.BadRequestException('phone 需為台灣手機號碼格式');
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('phone 不可為空');
        },
    }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        default: 1,
        description: '用餐人數',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)({
        message: () => {
            throw new common_1.BadRequestException('customer_num 需為整數');
        },
    }),
    (0, class_validator_1.Min)(1, {
        message: () => {
            throw new common_1.BadRequestException('customer_num 必填，且需輸入大於0的數字');
        },
    }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "customer_num", void 0);
exports.CreateReservationDto = CreateReservationDto;
//# sourceMappingURL=check-in-reservation.dto.js.map