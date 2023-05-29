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
const apiExample_1 = require("./apiExample");
const apiExample_2 = require("../../common/utils/apiExample");
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
    async checkTokenExp(request) {
        const { user } = request;
        return { hasExpired: false, exp: user.exp };
    }
    async signOut(request) {
        const jwt = request.headers.authorization.replace('Bearer ', '');
        return this.authService.setJwtToBlacklist(jwt);
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
            example: apiExample_1.signInExample,
        },
    }),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, payload_decorator_1.UserPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '檢查 token 是否過期' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_1.checkExample,
        },
    }),
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkTokenExp", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '登出' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: apiExample_2.basicExample,
        },
    }),
    (0, common_1.Get)('sign-out'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map