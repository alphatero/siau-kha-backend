import * as moment from 'moment';
import 'moment-timezone';

export function formatDateTime(originalDateTime) {
  const dateTime = new Date(originalDateTime);
  return moment.utc(dateTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
}
