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
exports.CreateTableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const order_1 = require("../../../core/models/order");
const table_main_1 = require("../../../core/models/table-main");
class CreateTableDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "table_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], CreateTableDto.prototype, "seat_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsEnum)(table_main_1.TableStatus),
    __metadata("design:type", String)
], CreateTableDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTableDto.prototype, "is_delete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", order_1.Order)
], CreateTableDto.prototype, "order", void 0);
exports.CreateTableDto = CreateTableDto;
//# sourceMappingURL=create-table.dto.js.map