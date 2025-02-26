export const generateUserCode = (prefix: string, name: string): string => {
  const formattedName = name.toUpperCase().replace(/\s+/g, '');
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${prefix}-${formattedName}-${day}${month}${year}`;
};
