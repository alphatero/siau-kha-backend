export const getOrderDetailExample = {
  status: 'success',
  message: '成功',
  data: {
    order_detail: [
      {
        id: '645bded09373ce38a31ef49e',
        product_detail: [
          {
            id: '645bded09373ce38a31ef49a',
            product_name: 'A5 日本和牛套餐',
            product_price: 2200,
            product_quantity: 3,
            product_note: ['去糖'],
            product_final_price: 1760,
            status: 'IN_PROGRESS',
            order_time: '2023-05-28 02:41',
          },
        ],
        activities: {
          activities_name: '',
          discount_type: '',
          charge_type: '',
          activity_charge: '88',
        },
        create_time: '2023-05-10T18:13:36.536Z',
      },
    ],
    total: 1760,
  },
};
