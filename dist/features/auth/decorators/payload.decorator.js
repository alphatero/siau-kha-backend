"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPayload = void 0;
const common_1 = require("@nestjs/common");
exports.UserPayload = (0, common_1.createParamDecorator)((input, context) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { user } = request;
    return input ? user === null || user === void 0 ? void 0 : user[input] : user;
});
//# sourceMappingURL=payload.decorator.js.map