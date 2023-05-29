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
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const auth_service_1 = require("../auth.service");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'user_account', passwordField: 'user_mima' });
        this.authService = authService;
    }
    async validate(user_account = '', user_mima = '') {
        const validate_result = await this.authService.validateUser(user_account, user_mima);
        if (!validate_result.user_state) {
            if (validate_result.state_message === '使用者不存在') {
                throw new common_1.UnauthorizedException('使用者不存在');
            }
            if (validate_result.state_message === '密碼不正確') {
                throw new common_1.UnauthorizedException('密碼不正確');
            }
        }
        const payload = {
            id: validate_result.user_info._id,
            user_name: validate_result.user_info.user_name,
            user_account: validate_result.user_info.user_account,
            user_role: validate_result.user_info.user_role,
        };
        return payload;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategies.js.map