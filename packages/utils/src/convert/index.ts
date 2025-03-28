export function toFloat(value: any, defaultValue: number = 0): number {
  return value ? parseFloat(value.toString()) : defaultValue;
}

export function toInt(value: any, defaultValue: number = 0): number {
  return value ? parseInt(value.toString()) : defaultValue;
}

export function calculateSubTotal(cartItems: any[]): number {
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }

  return (
    cartItems
      .reduce((acc, item) => {

        


        if (item.price) {
          return acc + item.price * item.qty;
        } else {
          return acc + item.salePrice * item.qty;
        }
      }, 0)
      .toFixed(2) ?? 0
  );
}
