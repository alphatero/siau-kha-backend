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
exports.CreateActivityDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateActivityDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '活動名稱', required: true }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('activities_name 不可為空');
        },
    }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "activities_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '計算類別' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['0', '1'], {
        message: () => {
            throw new common_1.BadRequestException("discount_type必須為 '0' 或 '1'");
        },
    }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "discount_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '計算類型' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['0', '1'], {
        message: () => {
            throw new common_1.BadRequestException("charge_type 必須為 '0' 或 '1'");
        },
    }),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "charge_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        default: 0,
        description: '最低消費金額',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({
        message: () => {
            throw new common_1.BadRequestException('min_spend 需為 正整數');
        },
    }),
    (0, class_validator_1.Min)(0, {
        message: () => {
            throw new common_1.BadRequestException('min_spend 不得為負數');
        },
    }),
    __metadata("design:type", Number)
], CreateActivityDto.prototype, "min_spend", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, description: '折扣/折讓' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({
        message: () => {
            throw new common_1.BadRequestException('discount 需為 正整數');
        },
    }),
    __metadata("design:type", Number)
], CreateActivityDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        default: false,
        description: '是否為期間限定',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateActivityDto.prototype, "is_period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: '活動開始時間',
    }),
    (0, class_validator_1.ValidateIf)((dto) => dto.is_period),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('此活動為期間限定，start_time 不可為空');
        },
    }),
    (0, class_validator_1.IsDateString)({ strict: true }, {
        message: () => {
            throw new common_1.BadRequestException('start_time 格式有誤，請依照 YYYY-MM-DD HH:mm:ss 格式輸入');
        },
    }),
    __metadata("design:type", Date)
], CreateActivityDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: '活動結束時間',
    }),
    (0, class_validator_1.ValidateIf)((dto) => dto.is_period),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('此活動為期間限定，end_time 不可為空');
        },
    }),
    (0, class_validator_1.IsDateString)({ strict: true }, {
        message: () => {
            throw new common_1.BadRequestException('end_time 格式有誤，請依照 YYYY-MM-DD HH:mm:ss 格式輸入');
        },
    }),
    __metadata("design:type", Date)
], CreateActivityDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '指定商品',
    }),
    (0, class_validator_1.IsMongoId)({
        each: true,
        message: () => {
            throw new common_1.BadRequestException('指定商品必須傳入MongoID格式的字串');
        },
    }),
    __metadata("design:type", Array)
], CreateActivityDto.prototype, "act_products_list", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        default: true,
        description: '活動狀態',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({
        message: () => {
            throw new common_1.BadRequestException('status 需為 true 或 false');
        },
    }),
    __metadata("design:type", Boolean)
], CreateActivityDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        default: false,
        description: '是否刪除',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({
        message: () => {
            throw new common_1.BadRequestException('is_delete 需為 true 或 false');
        },
    }),
    __metadata("design:type", Boolean)
], CreateActivityDto.prototype, "is_delete", void 0);
exports.CreateActivityDto = CreateActivityDto;
//# sourceMappingURL=create-activity.dto.js.map