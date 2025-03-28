export type CartItem = {
  id: string;
  title: string;
  salePrice: number;
  imageUrl: string;
  qty: number;
  vendorId: string;
};

export const isCartItem = (item: any): item is CartItem => {
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.salePrice === 'number' &&
    typeof item.qty === 'number'
  );
};

export const isCartItemArray = (items: any): items is CartItem[] => {
  return Array.isArray(items) && items.every(isCartItem);
};
