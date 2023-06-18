export function formatDateTime(originalDateTime) {
  const dateTime = new Date(originalDateTime);

  const year = dateTime.getUTCFullYear();
  let month: string | number = dateTime.getUTCMonth() + 1;
  let date: string | number = dateTime.getUTCDate();
  let hour: string | number = dateTime.getUTCHours();
  let minute: string | number = dateTime.getUTCMinutes();

  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return `${year}-${month}-${date} ${hour}:${minute}`;
}
