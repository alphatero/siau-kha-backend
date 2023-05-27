import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class AddProductMiddleware implements NestMiddleware {
  use(req: any, _: any, next: () => void) {
    // 1. [] 檢查 product_tags 是否為 ObjectId
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

/**
 * 檢查註記名稱是否重複
 * @param note_title_obj
 * @param note_title
 */
const checkNoteTitleRepeat = (note_title_obj, note_title) => {
  if (note_title_obj[note_title]) {
    throw new BadRequestException(`註記內，${note_title} 註記名稱重複`);
  } else {
    note_title_obj[note_title] = true;
  }
};

/**
 * 檢查子欄位是否存在
 * @param fieldName
 * @param subFields
 */
const checkSubFieldsExist = (
  fieldName,
  subFields,
  food_consumption_list_obj,
  noteTitle?,
) => {
  switch (fieldName) {
    case 'product_note':
      // 檢查欄位：note_title、use_money、is_food_consumption、food_consumption_list
      if (!subFields.note_title) {
        throw new BadRequestException(`${fieldName} 缺少 note_title 欄位`);
      } else {
        if (typeof subFields.note_title !== 'string') {
          throw new BadRequestException('note_title 欄位必須為字串');
        }
      }
      if (typeof subFields.use_money === 'undefined') {
        throw new BadRequestException(
          `${fieldName}內的「${subFields.note_title}」註記，缺少 use_money 欄位`,
        );
      } else {
        if (!Number.isInteger(subFields.use_money)) {
          throw new BadRequestException(
            `「${subFields.note_title}」註記內的 use_money 欄位必須為整數`,
          );
        }
      }

      if (typeof subFields.is_food_consumption === 'undefined') {
        throw new BadRequestException(
          `${fieldName}內的「${subFields.note_title}」註記，缺少 is_food_consumption 欄位`,
        );
      }

      if (typeof subFields.is_food_consumption !== 'boolean') {
        throw new BadRequestException(
          `「${subFields.note_title}」註記內的 is_food_consumption 欄位必須為布林值`,
        );
      }

      if (subFields.is_food_consumption) {
        if (!subFields.food_consumption_list) {
          throw new BadRequestException(
            `「${subFields.note_title}」註記內，當 is_food_consumption 為 true 時，則 food_consumption_list 欄位為必填`,
          );
        }
        if (!Array.isArray(subFields.food_consumption_list)) {
          throw new BadRequestException(
            `「${subFields.note_title}」註記內的 ${fieldName} 欄位必須為陣列`,
          );
        } else {
          if (subFields.food_consumption_list.length === 0) {
            throw new BadRequestException(
              `「${subFields.note_title}」註記內的 food_consumption_list 欄位未填入資料`,
            );
          } else {
            subFields.food_consumption_list.forEach((food) => {
              checkSubFieldsExist(
                'food_consumption_list',
                food,
                food_consumption_list_obj,
                subFields.note_title,
              );
            });
          }
        }
      } else {
        if (
          !Array.isArray(subFields.food_consumption_list) ||
          subFields.food_consumption_list.length > 0
        ) {
          throw new BadRequestException(
            `「${subFields.note_title}」註記內，當 is_food_consumption 為 false 時，則 food_consumption_list 欄位需提供空陣列`,
          );
        }
      }
      break;
    case 'food_consumption_list':
      // 檢查欄位：id、consumption_quantity
      if (!Types.ObjectId.isValid(subFields.id)) {
        throw new BadRequestException(
          noteTitle
            ? `「${noteTitle}」註記內的 ${fieldName} 內的 id 欄位必須為 ObjectId`
            : `${fieldName} 內的 id 欄位必須為 ObjectId`,
        );
      } else {
        subFields.id = new Types.ObjectId(subFields.id);
      }

      food_consumption_list_obj[subFields.id]
        ? food_consumption_list_obj[subFields.id]++
        : (food_consumption_list_obj[subFields.id] = 1);
      if (noteTitle) {
        if (!Number.isInteger(subFields.consumption_quantity)) {
          throw new BadRequestException(
            `「${noteTitle}」註記內的 ${fieldName} 內的 consumption_quantity 欄位必須為整數`,
          );
        }
      } else {
        if (
          !Number.isInteger(subFields.consumption_quantity) ||
          subFields.consumption_quantity < 0
        ) {
          throw new BadRequestException(
            `「${noteTitle}」註記內的 ${fieldName} 內的 consumption_quantity 欄位必須為正整數`,
          );
        }
      }
      break;
    default:
      break;
  }
};
