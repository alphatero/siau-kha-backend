"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayPort = void 0;
const dotenv = require("dotenv");
const gateways_type_1 = require("./gateways.type");
dotenv.config();
exports.gatewayPort = {
    [gateways_type_1.GATEWAY_NAMESPACE.ORDER_PRODUCT_DETAILS]: parseInt(process.env.ORDER_PRODUCT_DETAILS_PORT),
};
//# sourceMappingURL=gateway-port.js.map