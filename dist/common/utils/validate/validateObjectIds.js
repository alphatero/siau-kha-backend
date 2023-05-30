"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectIds = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
function validateObjectIds(ids) {
    Object.entries(ids).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val) => {
                Object.entries(val).forEach(([k, v]) => {
                    if (!mongoose_1.Types.ObjectId.isValid(v)) {
                        throw new common_1.BadRequestException(`${k}格式錯誤`);
                    }
                });
            });
            return;
        }
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`${key}格式錯誤`);
        }
    });
}
exports.validateObjectIds = validateObjectIds;
//# sourceMappingURL=validateObjectIds.js.map