export function getTomorrowDate(): string {
  const tomorrow = new Date();
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

export function getFirstDayOfCurrentMonth() {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

export function getLastDayOfCurrentMonth() {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
}

export function getCurrentDay() {
  let date = new Date();
  return new Date(date.setHours(12));
}
