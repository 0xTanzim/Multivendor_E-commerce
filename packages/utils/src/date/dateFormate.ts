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

export function convertIsoDateToNormalDate(isoDate: string | Date) {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

export function convertToNormalDate(isoDate: string | Date): string {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}
