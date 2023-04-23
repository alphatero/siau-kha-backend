import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const domain = process.env.MONGO_DOMAIN;
  const name = process.env.MONGO_NAME;
  const encodePassword = encodeURIComponent(password);
  const uri = `mongodb+srv://${username}:${encodePassword}@${domain}/${name}?retryWrites=true&w=majority`;
  return {
    username,
    password,
    domain,
    name,
    uri,
  };
});
