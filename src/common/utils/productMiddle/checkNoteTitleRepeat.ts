import { BadRequestException } from '@nestjs/common';

/**
 * 檢查註記名稱是否重複
 * @param note_title_obj
 * @param note_title
 */
export function checkNoteTitleRepeat(note_title_obj, note_title) {
  if (note_title_obj[note_title]) {
    throw new BadRequestException(`註記內「${note_title}」註記名稱重複`);
  } else {
    note_title_obj[note_title] = true;
  }
}
