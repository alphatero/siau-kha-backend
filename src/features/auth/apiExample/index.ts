import { basicExample } from 'src/common/utils/apiExample';

export const signInExample = {
  ...basicExample,
  data: {
    id: '644a6def9a4dcd031e9e3c78',
    user_name: 'Enzo',
    user_account: 'enzokao01',
    user_role: 'admin',
    token: 'JWT',
    exp: 1684483505000,
  },
};

export const checkExample = {
  ...basicExample,
  data: {
    hasExpired: false,
    exp: 1684483505000,
  },
};
