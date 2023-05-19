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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const payload_decorator_1 = require("./decorators/payload.decorator");
const guards_1 = require("../../common/guards");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async signIn(payload) {
        await this.userService.updateUserSignInTime(payload.id);
        const user_info = Object.assign({}, payload, this.authService.generateJwt(payload));
        return user_info;
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.LocalGuard),
    (0, swagger_1.ApiOperation)({ summary: '登入' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                user_account: { type: 'string' },
                user_mima: { type: 'string' },
            },
            required: ['user_account', 'user_mima'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                status: 'success',
                message: '成功',
                data: {
                    id: '644a6def9a4dcd031e9e3c78',
                    user_name: 'Enzo',
                    user_account: 'enzokao01',
                    user_role: 'admin',
                    token: 'JWT',
                },
            },
        },
    }),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, payload_decorator_1.UserPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map