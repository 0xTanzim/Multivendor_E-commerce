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

  return parseFloat(
    cartItems
      .reduce((acc, item) => {
        if (item.price) {
          return acc + item.price * item.qty;
        } else {
          return acc + item.salePrice * item.qty;
        }
      }, 0)
      .toFixed(2)
  );
}

export function calculateTax(subTotal: number): number {
  if (subTotal < 0) {
    throw new Error('Subtotal cannot be negative');
  }

  let tax: number;

  if (subTotal <= 50) tax = calculatePercentageRate(0.05) * subTotal;
  else if (subTotal <= 100) tax = calculatePercentageRate(0.1) * subTotal;
  else if (subTotal <= 500) tax = calculatePercentageRate(0.5) * subTotal;
  else if (subTotal <= 1000) tax = calculatePercentageRate(1) * subTotal;
  else if (subTotal <= 5000) tax = calculatePercentageRate(2.5) * subTotal;
  else if (subTotal <= 15000) tax = calculatePercentageRate(4) * subTotal;
  else if (subTotal <= 50000) tax = calculatePercentageRate(7) * subTotal;
  else tax = calculatePercentageRate(10) * subTotal;

  return parseFloat(tax.toFixed(2));
}

export function calculateShipping(
  subTotal: number,
  postalCode?: string
): number {
  if (subTotal < 0) {
    throw new Error('Subtotal cannot be negative');
  }

  if (subTotal >= 1500) return 0;

  let baseCost = 0;
  if (subTotal <= 100) baseCost = 5;
  else if (subTotal <= 1500) baseCost = 10;

  let shippingCost = baseCost;

  return shippingCost;
}

function calculatePercentageRate(rate: number): number {
  return rate / 100;
}
