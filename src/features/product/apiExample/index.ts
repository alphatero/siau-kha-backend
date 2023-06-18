import { basicExample } from 'src/common/utils/apiExample';

export const getProductTagsExample = {
  ...basicExample,
  data: {
    product_tags: [
      {
        id: '64568af83e7dc038127b7f19',
        tag_name: '主廚特選套餐',
        sort_no: 1,
      },
    ],
  },
};

export const getProductListExample = {
  ...basicExample,
  data: {
    product_list: [
      {
        id: '6457444fb88d606c8c658f74',
        product_name: 'A5 日本和牛套餐',
        product_type: '2',
        product_tags: '64568af83e7dc038127b7f19',
        product_image:
          'https://storage.googleapis.com/nestjsproject-image.appspot.com/images/44402f8c-3819-4408-9306-c2b1c9f26908.jpg?GoogleAccessId=firebase-adminsdk-at27n%40nestjsproject-image.iam.gserviceaccount.com&Expires=16730294400&Signature=WPwLE4ksKcwudcfwZeIxN8DCG9H6s3zJHecTfr7q%2F1cmHmHDXpKHBiotJsd730e62dGYyrz%2BXK9J325Xnqo8J4KWm9M3FJK6idrxDbU7zRQaqlJBsI5xhK8Qzf%2BUI2DigyZd%2Bvc8iGHTuLTvMlcEw3hKnXD8N5LIuriypbIgMa%2FIEpejymxpRFcG9tCbsr1BdaDebCX93X2UdVYZgI50mPxz7j2yGtOK6JwArCtZEofm0LWBagqB2D3DxsGAajPg50i9KDU%2BBNtrrPFxxvKAlZFw3dsJc%2B3l8OK5q9uTBDOmO03pbVoADlFyGl2Ww7yhBtPLkk1EgZN0iQg2yPCtBg%3D%3D',
        product_price: 2200,
        product_note: [
          {
            note_title: '飯少',
            use_money: 0,
            is_food_consumption: true,
            food_consumption_list: [
              {
                id: '6470717e588639ba8be5cfee',
                consumption_quantity: -1,
              },
            ],
          },
          {
            note_title: '瘦肉多一點',
            use_money: 0,
            is_food_consumption: false,
            food_consumption_list: [],
          },
        ],
      },
    ],
  },
};

export const getProductExample = {
  ...basicExample,
  data: {
    product: {
      id: '6457444fb88d606c8c658f74',
      product_name: 'A5 日本和牛套餐',
      product_type: '2',
      product_tags: '64568af83e7dc038127b7f19',
      product_price: 2200,
      product_note: [
        {
          note_title: '飯少',
          use_money: 0,
          is_food_consumption: true,
          food_consumption_list: [
            {
              id: '6470717e588639ba8be5cfee',
              consumption_quantity: -1,
            },
          ],
        },
        {
          note_title: '瘦肉多一點',
          use_money: 0,
          is_food_consumption: false,
          food_consumption_list: [],
        },
      ],
    },
  },
};
