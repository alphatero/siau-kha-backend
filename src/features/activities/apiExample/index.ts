import { basicExample } from 'src/common/utils/apiExample';

export const getActivityExample = {
  ...basicExample,
  data: {
    activities: [
      {
        id: '6459e2c4f30c49fdcfeff467',
        activities_name: '打卡優惠活動',
        discount_type: '1',
        charge_type: '0',
        min_spend: 299,
        discount: 70,
        is_period: true,
        start_time: '2023-05-02T07:23:22.000Z',
        end_time: '2023-06-30T11:22:22.000Z',
        act_products_list: ['644e9a33020c9409fe694dc4'],
      },
    ],
  },
};
