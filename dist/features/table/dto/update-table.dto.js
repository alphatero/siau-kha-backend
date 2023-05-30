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
exports.UpdateTableDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const table_main_1 = require("../../../core/models/table-main");
class UpdateTableDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, default: table_main_1.TableStatus.IDLE }),
    (0, class_validator_1.IsEnum)(table_main_1.TableStatus, {
        message: () => {
            throw new common_1.BadRequestException(`status 僅能為 ${Object.values(table_main_1.TableStatus)}`);
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
        default: 0,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateTableDto.prototype, "customer_num", void 0);
exports.UpdateTableDto = UpdateTableDto;
//# sourceMappingURL=update-table.dto.js.map