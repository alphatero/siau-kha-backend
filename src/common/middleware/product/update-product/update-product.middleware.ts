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
export class UpdateProductMiddleware implements NestMiddleware {
  use(req: any, _: any, next: () => void) {
    // UpdateProductMiddleware 主要處理 product_tags id 格式驗證以及product_note 和 food_consumption_list 的資料驗證，所有要針對這三個欄位做 req.body 是否有該屬性。
    const reqBody = req.body;
    if (Object.keys(reqBody).length === 0) {
      throw new BadRequestException('未提交更新項目');
    }
    const hasProductTag = reqBody.hasOwnProperty('product_tags');
    const hasProductNote = reqBody.hasOwnProperty('product_note');
    const hasFoodConsumptionList = reqBody.hasOwnProperty(
      'food_consumption_list',
    );
    if (hasProductTag && reqBody.product_tags) {
      if (!Types.ObjectId.isValid(reqBody.product_tags)) {
        throw new BadRequestException('product_tags 欄位必須為 ObjectId');
      }
    }
    const food_consumption_list_obj = {};
    if (hasProductNote && reqBody.product_note) {
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

    if (hasFoodConsumptionList && reqBody.food_consumption_list) {
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
    }

    // 把 food_consumption_list 裡用到的 food_item_id 組成轉成 ObjectId 的結果，
    // 傳遞到 controller 給 Service，讓 Service 在建立資料時可以直接用，不用再跑迴圈轉換。
    const product_note = hasProductNote ? [...reqBody.product_note] : [];
    const food_consumption_list = hasFoodConsumptionList
      ? [...reqBody.food_consumption_list]
      : [];
    req.middle_data = {
      food_consumption_list_obj,
      product_note,
      food_consumption_list,
    };

    next();
  }
}
