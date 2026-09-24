export const getMonthBounds = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

export const getToday = (now = new Date()) => {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
};
