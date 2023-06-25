"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOrigin = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.corsOrigin = {
    frontend_domain: process.env.FRONTEND_DOMAIN,
    pr_frontend_domain: new RegExp(process.env.PR_FRONTEND_DOMAIN),
    client_test_port: `http://localhost:${process.env.CLIENT_TEST_PORT}`,
    custom_frontend_domain: process.env.CUSTOM_FRONTEND_DOMAIN || '',
};
//# sourceMappingURL=cors-origin.js.map