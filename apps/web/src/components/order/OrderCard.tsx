import { IOrder } from '@repo/types';
import { calculateSubTotal, convertIsoDateToNormalDate } from '@repo/utils';
import Link from 'next/link';
import OrderItem from './OrderItem';

type OrderCardProps = {
  order: IOrder;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const formattedDate = convertIsoDateToNormalDate(order.createdAt ?? '');

  const subtotal = calculateSubTotal(order.OrderItem);

  return (
    <>
      <li className="overflow-hidden bg-white border border-gray-200 rounded-md">
        <div className="lg:flex">
          <div className="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
            <div className="px-4 py-6 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    # {order.orderNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    {formattedDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Amount
                  </p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    ${subtotal}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Order Status
                  </p>
                  <div className="mt-0.5 flex items-center">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                      <svg
                        className="w-2 h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
            <ul className="space-y-7">
              {order?.OrderItem.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-sm font-bold text-gray-900">
                    No items in this order
                  </p>
                </div>
              ) : (
                order?.OrderItem?.map((orderItem) => {
                  return <OrderItem key={orderItem.id} orderItem={orderItem} />;
                })
              )}
            </ul>

            <hr className="mt-8 border-gray-200" />

            <div className="flex items-center mt-8 space-x-5">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
              >
                View Order
              </button>

              <Link
                href={`/dashboard/orders/${order.id}/invoice`}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
              >
                View Invoice
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderCard;
