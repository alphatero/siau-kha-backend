export const postOrderDetailExample = {
  status: 'success',
  message: '成功',
  data: {
    order: '644e5571020c9409fe694db5',
    product_detail: ['645be06607b72ad4a95c1f53'],
    total: 2200,
    status: 'IN_PROGRESS',
    create_user: '644b1c251bdbf1f010dddaf9',
    _id: '645be06707b72ad4a95c1f59',
    create_time: '2023-05-10T18:20:23.425Z',
    updatedAt: '2023-05-10T18:20:23.425Z',
  },
};

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
          },
        ],
        create_time: '2023-05-10T18:13:36.536Z',
      },
    ],
    total: 1760,
  },
};

export const commonExample = {
  status: 'success',
  message: '成功',
  data: {},
};
