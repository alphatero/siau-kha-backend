"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_RESPONSE_INTERCEPTOR = void 0;
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("../interceptors/response/response.interceptor");
exports.GLOBAL_RESPONSE_INTERCEPTOR = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: response_interceptor_1.ResponseInterceptor,
};
//# sourceMappingURL=response.provider.js.map