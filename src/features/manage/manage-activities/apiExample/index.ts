export const getActivitiesExample = {
  status: 'success',
  message: '成功',
  data: {
    act_list: [
      {
        id: '6464502803cebeb3d51f441b',
        activities_name: '經典霜降牛套餐折讓300元優惠活動',
        discount_type: '1',
        charge_type: '1',
        min_spend: 50,
        discount: 300,
        is_period: true,
        start_time: '2023-05-01T07:23:22.000Z',
        end_time: '2023-06-30T11:22:22.000Z',
        act_products_list: [
          {
            id: '6460e424ced82fe876a13e38',
            product_name: '經典霜降牛套餐',
            product_type: '1',
            product_price: 1880,
          },
        ],
        status: true,
      },
      {
        id: '6464505003cebeb3d51f441d',
        activities_name: '經典霜降牛套餐折扣20%(8折)優惠活動',
        discount_type: '1',
        charge_type: '0',
        min_spend: 50,
        discount: 20,
        is_period: true,
        start_time: '2023-05-01T07:23:22.000Z',
        end_time: '2023-06-30T11:22:22.000Z',
        act_products_list: [
          {
            id: '6460e424ced82fe876a13e38',
            product_name: '經典霜降牛套餐',
            product_type: '1',
            product_price: 1880,
          },
        ],
        status: true,
      },
    ],
  },
};
