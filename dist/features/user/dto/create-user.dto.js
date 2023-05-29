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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_1 = require("../../../core/models/user");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.MinLength)(user_1.USER_USERNAME_MIN_LENGTH),
    (0, class_validator_1.MaxLength)(user_1.USER_USERNAME_MAX_LENGTH),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_account", void 0);
__decorate([
    (0, class_validator_1.MinLength)(user_1.USER_PASSWORD_MIN_LENGTH),
    (0, class_validator_1.MaxLength)(user_1.USER_PASSWORD_MAX_LENGTH),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_mima", void 0);
__decorate([
    (0, class_validator_1.MinLength)(user_1.USER_USERNAME_MIN_LENGTH),
    (0, class_validator_1.MaxLength)(user_1.USER_USERNAME_MAX_LENGTH),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_1.Role),
    __metadata("design:type", String)
], CreateUserDto.prototype, "user_role", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map