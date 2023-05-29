"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL_VALIDATION_PIPE = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
exports.GLOBAL_VALIDATION_PIPE = {
    provide: core_1.APP_PIPE,
    useFactory: () => {
        return new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
        });
    },
};
//# sourceMappingURL=validation.provider.js.map