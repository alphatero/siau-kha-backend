import { registerAs } from '@nestjs/config';

export default registerAs('secrets', () => ({
  jwt: process.env.JWT_SECRET,
}));
