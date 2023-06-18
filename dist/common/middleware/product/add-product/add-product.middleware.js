"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const productMiddle_1 = require("../../../utils/productMiddle");
let AddProductMiddleware = class AddProductMiddleware {
    use(req, _, next) {
        const reqBody = req.body;
        if (reqBody.product_tags) {
            if (!mongoose_1.Types.ObjectId.isValid(reqBody.product_tags)) {
                throw new common_1.BadRequestException('product_tags 欄位必須為 ObjectId');
            }
        }
        const food_consumption_list_obj = {};
        if (reqBody.product_note) {
            if (!Array.isArray(reqBody.product_note)) {
                throw new common_1.BadRequestException('product_note 必須為陣列');
            }
            const note_title_obj = {};
            if (reqBody.product_note.length > 0) {
                reqBody.product_note.forEach((note) => {
                    (0, productMiddle_1.checkSubFieldsExist)('product_note', note, food_consumption_list_obj);
                    (0, productMiddle_1.checkNoteTitleRepeat)(note_title_obj, note.note_title);
                });
            }
        }
        if (!Array.isArray(reqBody.food_consumption_list)) {
            throw new common_1.BadRequestException('food_consumption_list 必須為陣列');
        }
        if (reqBody.food_consumption_list.length > 0) {
            reqBody.food_consumption_list.forEach((food) => {
                (0, productMiddle_1.checkSubFieldsExist)('food_consumption_list', food, food_consumption_list_obj);
            });
        }
        const product_note = [...reqBody.product_note];
        const food_consumption_list = [...reqBody.food_consumption_list];
        req.middle_data = {
            food_consumption_list_obj,
            product_note,
            food_consumption_list,
        };
        next();
    }
};
AddProductMiddleware = __decorate([
    (0, common_1.Injectable)()
], AddProductMiddleware);
exports.AddProductMiddleware = AddProductMiddleware;
//# sourceMappingURL=add-product.middleware.js.map