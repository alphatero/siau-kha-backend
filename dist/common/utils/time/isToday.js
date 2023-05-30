"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToday = void 0;
function isToday(date) {
    const today = new Date();
    return (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear());
}
exports.isToday = isToday;
//# sourceMappingURL=isToday.js.map