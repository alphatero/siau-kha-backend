import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Types } from 'mongoose';
import {
  checkNoteTitleRepeat,
  checkSubFieldsExist,
} from 'src/common/utils/productMiddle';

@Injectable()
export class AddProductMiddleware implements NestMiddleware {
  use(req: any, _: any, next: () => void) {
    const reqBody = req.body;
    if (reqBody.product_tags) {
      if (!Types.ObjectId.isValid(reqBody.product_tags)) {
        throw new BadRequestException('product_tags 欄位必須為 ObjectId');
      }
    }
    const food_consumption_list_obj = {};
    if (reqBody.product_note) {
      if (!Array.isArray(reqBody.product_note)) {
        throw new BadRequestException('product_note 必須為陣列');
      }
      const note_title_obj = {};
      if (reqBody.product_note.length > 0) {
        reqBody.product_note.forEach((note) => {
          checkSubFieldsExist('product_note', note, food_consumption_list_obj);
          checkNoteTitleRepeat(note_title_obj, note.note_title);
        });
      }
    }

    if (!Array.isArray(reqBody.food_consumption_list)) {
      throw new BadRequestException('food_consumption_list 必須為陣列');
    }

    if (reqBody.food_consumption_list.length > 0) {
      reqBody.food_consumption_list.forEach((food) => {
        checkSubFieldsExist(
          'food_consumption_list',
          food,
          food_consumption_list_obj,
        );
      });
    }
    // 把 food_consumption_list 裡用到的 food_item_id 組成轉成 ObjectId 的結果，
    // 傳遞到 controller 給 Service，讓 Service 在建立資料時可以直接用，不用再跑迴圈轉換。
    const product_note = [...reqBody.product_note];
    const food_consumption_list = [...reqBody.food_consumption_list];
    req.middle_data = {
      food_consumption_list_obj,
      product_note,
      food_consumption_list,
    };

    next();
  }
}
