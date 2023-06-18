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
exports.AddTagDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddTagDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '標籤名稱', required: true, type: String }),
    (0, class_validator_1.IsString)({
        message: () => {
            throw new common_1.BadRequestException('tag_name 需為字串');
        },
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: () => {
            throw new common_1.BadRequestException('tag_name 不可為空');
        },
    }),
    __metadata("design:type", String)
], AddTagDto.prototype, "tag_name", void 0);
exports.AddTagDto = AddTagDto;
//# sourceMappingURL=add-tag.dto.js.map