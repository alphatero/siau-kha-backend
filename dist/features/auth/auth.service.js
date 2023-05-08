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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../user");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(user_account, user_mima) {
        const validate_state = {
            user_state: false,
            state_message: '',
            user_info: {},
        };
        try {
            const user = await this.userService.getUser({ user_account });
            if (!user) {
                validate_state.user_state = false;
                validate_state.state_message = '使用者不存在';
                return validate_state;
            }
            const pass = await bcrypt.compare(user_mima, user.user_mima);
            if (!pass) {
                validate_state.user_state = false;
                validate_state.state_message = '密碼不正確';
                return validate_state;
            }
            validate_state.user_state = true;
            validate_state.state_message = '驗證通過';
            validate_state.user_info = user.toJSON();
            return validate_state;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('資料庫錯誤');
        }
    }
    generateJwt(payload) {
        const token = this.jwtService.sign(payload);
        return { token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map