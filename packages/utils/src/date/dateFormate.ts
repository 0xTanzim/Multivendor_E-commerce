/**
 *  Format date to ISO string. Example: 2021-09-01T00:00:00.000Z
 * @param date
 * @returns  ISO string
 */

export const isoFormate = (date: string) => {
  const dateObj = new Date(date);
  const isoString = dateObj.toISOString();

  return isoString;
};

/**
 *  Format date to dd/mm/yyyy format
 * @param date   Date object
 * @returns Formatted date as a string in dd/mm/yyyy format
 */
export const formatDate = (date: unknown): string => {
  const dateObj = new Date(date as string | number | Date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
