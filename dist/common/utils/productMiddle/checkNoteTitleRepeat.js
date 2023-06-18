"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNoteTitleRepeat = void 0;
const common_1 = require("@nestjs/common");
function checkNoteTitleRepeat(note_title_obj, note_title) {
    if (note_title_obj[note_title]) {
        throw new common_1.BadRequestException(`註記內「${note_title}」註記名稱重複`);
    }
    else {
        note_title_obj[note_title] = true;
    }
}
exports.checkNoteTitleRepeat = checkNoteTitleRepeat;
//# sourceMappingURL=checkNoteTitleRepeat.js.map