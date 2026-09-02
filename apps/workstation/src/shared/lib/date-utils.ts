export function formatDateToString(dateToFormat: Date) {
  const date = new Date(dateToFormat);
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear()
  );
}

export function formatTimeToString(dateToFormat: Date | string | number | null | undefined) {
  if (!dateToFormat) return '--:--:--';
  const date = new Date(dateToFormat);

  if (isNaN(date.getTime())) return '--:--:--';

  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}
