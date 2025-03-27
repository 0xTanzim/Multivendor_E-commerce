import { Product } from '../product';
import { IPayMethod, IPerson, IShippingData } from './checkout';

import { $Enums } from '@repo/database';

export type IOrder = IPerson &
  IShippingData &
  IPayMethod & {
    id?: string;
    orderStatus?: $Enums.OrderStatus;
    paymentToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
    OrderItem: IOrderItem[];
  };

export type IOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  qty: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;

  order?: IOrder;
  product?: Product;
};

export function isOrder(obj: unknown): obj is IOrder {
  if (typeof obj !== 'object' || obj === null) return false;
  const orderObj = obj as IOrder;

  return (
    'firstName' in orderObj &&
    typeof orderObj.firstName === 'string' &&
    'lastName' in orderObj &&
    typeof orderObj.lastName === 'string' &&
    'email' in orderObj &&
    typeof orderObj.email === 'string' &&
    'phoneNumber' in orderObj &&
    typeof orderObj.phoneNumber === 'string' &&
    'streetAddress' in orderObj &&
    typeof orderObj.streetAddress === 'string' &&
    'city' in orderObj &&
    typeof orderObj.city === 'string' &&
    'country' in orderObj &&
    typeof orderObj.country === 'string' &&
    'postalCode' in orderObj &&
    typeof orderObj.postalCode === 'string' &&
    'paymentMethod' in orderObj &&
    typeof orderObj.paymentMethod === 'string' &&
    'userId' in orderObj &&
    (typeof orderObj.userId === 'string' || orderObj.userId === undefined)
  );
}

export function isOrderArray(obj: unknown): obj is IOrder[] {
  return Array.isArray(obj) && obj.every(isOrder);
}

export function isOrderItem(obj: unknown): obj is IOrderItem {
  if (typeof obj !== 'object' || obj === null) return false;
  const orderItemObj = obj as IOrderItem;

  console.log('Checking order item', orderItemObj);

  return (
    'qty' in orderItemObj &&
    typeof orderItemObj.qty === 'number'
  );
}

export function isOrderItemArray(obj: unknown): obj is IOrderItem[] {
  return Array.isArray(obj) && obj.every(isOrderItem);
}
