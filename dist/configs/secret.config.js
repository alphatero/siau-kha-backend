"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('secrets', () => ({
    jwt: process.env.JWT_SECRET,
}));
//# sourceMappingURL=secret.config.js.map