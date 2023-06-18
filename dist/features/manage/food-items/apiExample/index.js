"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodItemsExample = void 0;
const apiExample_1 = require("../../../../common/utils/apiExample");
exports.getFoodItemsExample = Object.assign(Object.assign({}, apiExample_1.basicExample), { data: {
        foodItems: [
            {
                id: '646db7ff232c4de5fb342224',
                food_items_name: '日本和牛霜降',
                group: [
                    {
                        _id: '646db65777ddbc83dce01d71',
                        group_name: '牛肉',
                        is_delete: false,
                    },
                ],
                purchase_cost: 30,
                item_stock: 2500,
                safety_stock: 1200,
                status: '0',
                units: '斤',
            },
        ],
    } });
//# sourceMappingURL=index.js.map