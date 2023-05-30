"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInMiddleware = void 0;
const common_1 = require("@nestjs/common");
let SignInMiddleware = class SignInMiddleware {
    use(req, _, next) {
        const reqBody = req.body;
        if (!reqBody.user_account && !reqBody.user_mima) {
            throw new common_1.BadRequestException('未帶入必要參數：user_account, user_mima');
        }
        if (!reqBody.user_account) {
            throw new common_1.BadRequestException('未帶入必要參數：user_account');
        }
        if (!reqBody.user_mima) {
            throw new common_1.BadRequestException('未帶入必要參數：user_mima');
        }
        next();
    }
};
SignInMiddleware = __decorate([
    (0, common_1.Injectable)()
], SignInMiddleware);
exports.SignInMiddleware = SignInMiddleware;
//# sourceMappingURL=signIn.middleware.js.map