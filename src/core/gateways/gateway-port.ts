import * as dotenv from 'dotenv';
import { GATEWAY_NAMESPACE } from './gateways.type';

dotenv.config();

// key: namespace, value: port
export const gatewayPort = {
  [GATEWAY_NAMESPACE.ORDER_PRODUCT_DETAILS]: parseInt(
    process.env.ORDER_PRODUCT_DETAILS_PORT,
  ),
};
