"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('mongo', () => {
    const username = process.env.MONGO_USERNAME;
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const resource = process.env.MONGO_RESOURCE;
    const uri = `mongodb+srv://${username}:${password}@${resource}`;
    return {
        username,
        password,
        resource,
        uri,
    };
});
//# sourceMappingURL=database.config.js.map