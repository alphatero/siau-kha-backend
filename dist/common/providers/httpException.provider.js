"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_HTTP_EXCEPTION = void 0;
const core_1 = require("@nestjs/core");
const filters_1 = require("../filters");
exports.GLOBAL_HTTP_EXCEPTION = {
    provide: core_1.APP_FILTER,
    useClass: filters_1.HttpFilter,
};
//# sourceMappingURL=httpException.provider.js.map