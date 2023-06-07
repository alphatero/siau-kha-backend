import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

/**
 * 檢查子欄位是否存在
 * @param fieldName
 * @param subFields
 * @param food_consumption_list_obj
 * @param noteTitle
 */
export function checkSubFieldsExist(
  fieldName,
  subFields,
  food_consumption_list_obj,
  noteTitle?,
) {
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
          subFields.consumption_quantity === 0
        ) {
          throw new BadRequestException(
            `${fieldName} 內的 consumption_quantity 欄位必須為整數且不等於0`,
          );
        }
      }
      break;
    default:
      break;
  }
}
