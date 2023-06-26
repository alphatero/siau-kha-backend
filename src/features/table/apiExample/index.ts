import { basicExample } from 'src/common/utils/apiExample';

export const getTableListExample = {
  ...basicExample,
  data: {
    table_list: [
      {
        id: '644e543b893f163f3a3678f6',
        table_name: 'TA 1',
        seat_max: 0,
        status: 'MEAL',
        customer_num: 3,
        create_time: '2023-04-30T16:00:00.000Z',
        is_pay: false,
        order_id: '644e5571020c9409fe694db5',
        order_detail: [
          [
            {
              order_detail_id: '645bded09373ce38a31ef49e',
              id: '645bded09373ce38a31ef49a',
              product_name: 'A5 日本和牛套餐',
              product_note: ['少冰'],
              status: 'IN_PROGRESS',
              is_delete: false,
              order_time: '2023-05-28 02:41',
            },
            {
              order_detail_id: '645bded09373ce38a31ef49e',
              id: '645bded09373ce38a31ef49a',
              product_name: '豪華全牛套餐',
              product_note: ['少冰'],
              status: 'IN_PROGRESS',
              is_delete: false,
              order_time: '2023-05-28 02:41',
            },
          ],
          [
            {
              order_detail_id: '645be06707b72ad4a95c1f59',
              id: '645be06607b72ad4a95c1f53',
              product_name: '可爾必思',
              product_note: ['少冰'],
              status: 'IN_PROGRESS',
              is_delete: false,
              order_time: '2023-05-28 02:41',
            },
          ],
        ],
      },
      {
        id: '644e54a6893f163f3a3678f8',
        table_name: 'TA 2',
        seat_max: 0,
        status: 'IDLE',
      },
    ],
  },
};
