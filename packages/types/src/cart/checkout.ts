import { CartItem } from './cart';

export type IPerson = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userId: string;
};

export type IShippingData = {
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  shippingCost: number | string;
};

export type IPayMethod = {
  paymentMethod: string;
};

export type ICheckoutFormData = IPerson & IShippingData & IPayMethod;

export type ICombinedData = {
  checkoutFormData: ICheckoutFormData;
  cartItems: CartItem[];
};
