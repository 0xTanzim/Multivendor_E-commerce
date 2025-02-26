export function generateCouponCode(title: string, expiryDate: string| Date): string {
 
  const formattedTitle = title.toUpperCase().replace(/\s+/g, '');

 
  const date = new Date(expiryDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2); 

  
  return `${formattedTitle}-${day}${month}${year}`;
}

// Output: BLACKFRIDAY-241123