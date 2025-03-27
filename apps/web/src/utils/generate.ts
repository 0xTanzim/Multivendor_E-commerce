
import * as base64 from 'base64url'

export function generateOrderNumber(length: number) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let orderNumber = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}
