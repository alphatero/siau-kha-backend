"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = void 0;
function formatDateTime(originalDateTime) {
    const dateTime = new Date(originalDateTime);
    const year = dateTime.getUTCFullYear();
    let month = dateTime.getUTCMonth() + 1;
    let date = dateTime.getUTCDate();
    let hour = dateTime.getUTCHours();
    let minute = dateTime.getUTCMinutes();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    return `${year}-${month}-${date} ${hour}:${minute}`;
}
exports.formatDateTime = formatDateTime;
//# sourceMappingURL=formatDateTime.js.map