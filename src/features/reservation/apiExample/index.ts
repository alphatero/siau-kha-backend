import { basicExample } from 'src/common/utils/apiExample';

export const getReservationWaitListExample = {
  ...basicExample,
  data: {
    reservation_list: [
      {
        id: '645b579334c423887ff962ea',
        name: '陳先生',
        customer_num: 3,
        create_time: '2023-05-10T08:36:35.509Z',
        status: 'WAIT',
      },
    ],
  },
};
