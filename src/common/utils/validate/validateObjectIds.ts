import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export function validateObjectIds(ids) {
  Object.entries(ids).forEach(([key, value]: [string, string | any[]]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        Object.entries(val).forEach(([k, v]: [string, string]) => {
          if (!Types.ObjectId.isValid(v)) {
            throw new BadRequestException(`${k}格式錯誤`);
          }
        });
      });
      return;
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${key}格式錯誤`);
    }
  });
}
