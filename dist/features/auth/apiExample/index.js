"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExample = exports.signInExample = void 0;
const apiExample_1 = require("../../../common/utils/apiExample");
exports.signInExample = Object.assign(Object.assign({}, apiExample_1.basicExample), { data: {
        id: '644a6def9a4dcd031e9e3c78',
        user_name: 'Enzo',
        user_account: 'enzokao01',
        user_role: 'admin',
        token: 'JWT',
        exp: 1684483505000,
    } });
exports.checkExample = Object.assign(Object.assign({}, apiExample_1.basicExample), { data: {
        hasExpired: false,
        exp: 1684483505000,
    } });
//# sourceMappingURL=index.js.map