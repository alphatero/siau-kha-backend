"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOrigin = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.corsOrigin = {
    frontend_domain: process.env.FRONTEND_DOMAIN,
    pr_frontend_domain: new RegExp(process.env.PR_FRONTEND_DOMAIN),
    client_test_port: process.env.CLIENT_TEST_PORT,
};
//# sourceMappingURL=cors-origin.js.map