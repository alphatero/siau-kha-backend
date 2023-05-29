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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_const_1 = require("./user.const");
const user_type_1 = require("./user.type");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({
        min: user_const_1.USER_USERNAME_MIN_LENGTH,
        max: user_const_1.USER_USERNAME_MAX_LENGTH,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "user_account", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "user_mima", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        min: user_const_1.USER_USERNAME_MIN_LENGTH,
        max: user_const_1.USER_USERNAME_MAX_LENGTH,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "user_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(user_type_1.Role),
    }),
    __metadata("design:type", String)
], User.prototype, "user_role", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "create_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "updated_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_blocked", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "set_blocked_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "last_sign_in_time", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_time',
            updatedAt: 'updated_time',
        },
        versionKey: false,
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.model.js.map