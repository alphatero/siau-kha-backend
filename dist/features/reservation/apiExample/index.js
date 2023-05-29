"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationWaitListExample = void 0;
const apiExample_1 = require("../../../common/utils/apiExample");
exports.getReservationWaitListExample = Object.assign(Object.assign({}, apiExample_1.basicExample), { data: {
        reservation_list: [
            {
                id: '645b579334c423887ff962ea',
                name: '陳先生',
                customer_num: 3,
                create_time: '2023-05-10T08:36:35.509Z',
                status: 'WAIT',
            },
        ],
    } });
//# sourceMappingURL=index.js.map