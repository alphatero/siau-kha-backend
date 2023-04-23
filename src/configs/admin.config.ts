import { registerAs } from '@nestjs/config';

export default registerAs('admin', () => ({
  username: process.env.DEFAULT_ADMIN_USERNAME,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
  email: process.env.DEFAULT_ADMIN_EMAIL,
}));
