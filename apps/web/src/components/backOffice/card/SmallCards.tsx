import { $Enums } from '@repo/database';
import { IOrder } from '@repo/types';
import SmallCard from './SmallCard';

type SmallCardsProps = {
  orders: IOrder[];
};

function getOrderByStatusCount(orders: IOrder[], status: $Enums.OrderStatus) {
  return orders
    .filter((order) => order.orderStatus === status)
    .length.toString()
    .padStart(2, '0');
}

const SmallCards = ({ orders }: SmallCardsProps) => {
  const ordersCount = orders.length.toString().padStart(2, '0');
  const pendingOrdersCount = getOrderByStatusCount(orders, 'PENDING');
  const processingOrdersCount = getOrderByStatusCount(orders, 'PROCESSING');
  const deliveredOrdersCount = getOrderByStatusCount(orders, 'DELIVERED');

  const orderStatus = [
    {
      title: 'Total Orders',
      number: ordersCount,
      iconColor: 'bg-green-600',
      icon: 'Cart',
    },
    {
      title: 'Orders Pending',
      number: pendingOrdersCount,
      iconColor: 'bg-blue-600',
      icon: 'Loader',
    },
    {
      title: 'Order Processing',
      number: processingOrdersCount,
      iconColor: 'bg-orange-600',
      icon: 'RefreshCcw',
    },
    {
      title: 'Orders Delivered',
      number: deliveredOrdersCount,
      iconColor: 'bg-purple-600',
      icon: 'CheckCheck',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStatus.map((order, index) => (
        <SmallCard key={index} data={order} />
      ))}
    </div>
  );
};

export default SmallCards;
