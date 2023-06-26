"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = void 0;
const moment = require("moment");
require("moment-timezone");
function formatDateTime(originalDateTime) {
    const dateTime = new Date(originalDateTime);
    return moment.utc(dateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
}
exports.formatDateTime = formatDateTime;
//# sourceMappingURL=formatDateTime.js.map