import { registerAs } from '@nestjs/config';

export default registerAs('socketPort', () => {
  const orderProductDetails = process.env.ORDER_PRODUCT_DETAILS_PORT;

  return {
    orderProductDetails,
  };
});
