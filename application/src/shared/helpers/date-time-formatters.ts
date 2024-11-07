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
  return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + date.getSeconds();
}
