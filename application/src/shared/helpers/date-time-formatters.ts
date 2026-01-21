export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setTime(tomorrow.getTime() + 3 * 60 * 60 * 1000);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toJSON().slice(0, 10);
}

export function formatDateToString(dateToFormat: Date) {
  const date = new Date(dateToFormat);
  return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
}

export function formatTimeToString(dateToFormat: Date) {
  const date = new Date(dateToFormat);
  return (
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2)
  );
}

export function formatTwoDatesDiffTimeToString(startDate: Date, endDate: Date) {
  const diff = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff - days * 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor((diff - days * 1000 * 60 * 60 * 24 - 60 * 60000 * hours) / 60000);
  const seconds = Math.trunc((diff - days * 1000 * 60 * 60 * 24 - 60 * 60000 * hours - 60000 * minutes) / 1000);

  return (
    (days ? days + " сут., " : "") +
    ("0" + hours).slice(-2) +
    ":" +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
}

export function getFirstDayOfCurrentMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

export function getLastDayOfCurrentMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
}

export function getCurrentDay() {
  const date = new Date();
  date.setTime(date.getTime() + 3 * 60 * 60 * 1000);
  // return new Date(date.setHours(12));
  return date;
}

export function msToTime(s: number) {
  // Pad to 2 digits
  const pad = (n: number, z = 2) => ("00" + n).slice(-z);

  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
}

// export function getCurrentDay() {
//   let date = new Date();
//   return new Date(date.setHours(12));
// }
