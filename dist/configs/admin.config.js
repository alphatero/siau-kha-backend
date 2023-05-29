"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('admin', () => ({
    username: process.env.DEFAULT_ADMIN_USERNAME,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
    email: process.env.DEFAULT_ADMIN_EMAIL,
}));
//# sourceMappingURL=admin.config.js.map