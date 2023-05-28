import { basicExample } from 'src/common/utils/apiExample';

const productExample = {
  id: '6457444fb88d606c8c658f74',
  product_name: 'A5 日本和牛套餐',
  product_type: 1,
  product_tags: '64568af83e7dc038127b7f19',
  product_image:
    'https://storage.googleapis.com/nestjsproject-image.appspot.com/images/44402f8c-3819-4408-9306-c2b1c9f26908.jpg?GoogleAccessId=firebase-adminsdk-at27n%40nestjsproject-image.iam.gserviceaccount.com&Expires=16730294400&Signature=WPwLE4ksKcwudcfwZeIxN8DCG9H6s3zJHecTfr7q%2F1cmHmHDXpKHBiotJsd730e62dGYyrz%2BXK9J325Xnqo8J4KWm9M3FJK6idrxDbU7zRQaqlJBsI5xhK8Qzf%2BUI2DigyZd%2Bvc8iGHTuLTvMlcEw3hKnXD8N5LIuriypbIgMa%2FIEpejymxpRFcG9tCbsr1BdaDebCX93X2UdVYZgI50mPxz7j2yGtOK6JwArCtZEofm0LWBagqB2D3DxsGAajPg50i9KDU%2BBNtrrPFxxvKAlZFw3dsJc%2B3l8OK5q9uTBDOmO03pbVoADlFyGl2Ww7yhBtPLkk1EgZN0iQg2yPCtBg%3D%3D',
  product_note: [
    {
      note_title: '飯少',
      use_money: 0,
      is_food_consumption: true,
      food_consumption_list: [
        {
          id: '6470717e588639ba8be5cfee',
          consumption_quantity: -1,
          food_item_name: '米',
          group: [
            {
              _id: '64707109588639ba8be5cfed',
              group_name: '五穀',
              is_delete: false,
            },
          ],
          purchase_cost: 5,
          item_stock: 2500,
          safety_stock: 1200,
          status: '0',
          units: '斤',
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
  food_consumption_list: [
    {
      id: '6470983e96413b719f16a042',
      consumption_quantity: 2,
    },
    {
      consumption_quantity: 2,
      id: '646dbdbe232c4de5fb342228',
      food_item_name: '日本和牛牛五花',
      group: [
        {
          _id: '646db65777ddbc83dce01d71',
          group_name: '牛肉',
          is_delete: false,
        },
      ],
      purchase_cost: 20,
      item_stock: 2500,
      safety_stock: 1200,
      status: '0',
      units: '斤',
    },
  ],
  is_delete: false,
};

export const getTagsExample = {
  ...basicExample,
  data: {
    list: [
      {
        id: '64568d580132acb4009e44da',
        tag_name: '人氣單點',
        sort_no: 6,
      },
    ],
  },
};

export const getProductListExample = {
  ...basicExample,
  data: {
    list: [productExample],
  },
};

export const getProductExample = {
  ...basicExample,
  data: productExample,
};
