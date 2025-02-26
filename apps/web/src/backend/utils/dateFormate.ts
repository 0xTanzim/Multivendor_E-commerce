export const isoFormate = (date: string) => {
  const dateObj = new Date(date);
  const isoString = dateObj.toISOString();

  return isoString;
};
