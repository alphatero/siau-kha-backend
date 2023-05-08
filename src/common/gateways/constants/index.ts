import * as dotenv from 'dotenv';

dotenv.config();

export const corsOrigin = {
  frontend_domain: process.env.FRONTEND_DOMAIN,
  pr_frontend_domain: new RegExp(process.env.PR_FRONTEND_DOMAIN),
  client_test_port: process.env.CLIENT_TEST_PORT,
};

// key: namespace, value: port
export const gatewayPort = {
  'order-product-details': parseInt(process.env.ORDER_PRODUCT_DETAILS_PORT),
};
