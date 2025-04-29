import { IOrderItem } from '@repo/types';
import { generateSlug } from '@repo/utils';
import Image from 'next/image';
import Link from 'next/link';

type OrderItemProps = {
  orderItem: IOrderItem;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const slug = generateSlug(orderItem.title);

  return (
    <>
      <li className="relative flex pb-10 sm:pb-0">
        <div className="flex-shrink-0">
          <Image
            className="object-cover rounded-lg w-28 h-28"
            src={orderItem.imageUrl ?? ''}
            alt={orderItem.title}
            width={112}
            height={112}
          />
        </div>

        <div className="flex flex-col justify-between flex-1 ml-5">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
            <div>
              <p className="text-base font-bold text-gray-900">
                {orderItem.title}
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-500">
                qty: {orderItem.qty}
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <p className="text-base font-bold text-left text-gray-900 sm:text-right">
                ${orderItem.price}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 sm:relative">
            <div className="flex space-x-5">
              <Link
                href={`/products/${slug}`}
                title={orderItem.title}
                className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                View Product
              </Link>

              <span className="text-gray-200"> | </span>

              <Link
                href={`#`}
                title=""
                className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Similar Product
              </Link>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderItem;
