'use client';

import { Clock, CreditCard, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

type OverviewCardsProps = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
};

const OverviewCards = ({
  totalSales,
  totalOrders,
  totalProducts,
  pendingOrders,
}: OverviewCardsProps) => {
  const analytics = [
    {
      title: 'Total Products',
      count: totalProducts.toString(),
      unit: '',
      link: '/dashboard/products',
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Orders',
      count: totalOrders.toString(),
      unit: '',
      link: '/dashboard/orders',
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Sales',
      count: totalSales.toFixed(2),
      unit: '$',
      link: '/dashboard/sales',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Pending Orders',
      count: pendingOrders.toString(),
      unit: '',
      link: '/dashboard/orders?status=pending',
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {analytics.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {item.unit}
              {item.count}
            </p>
          </div>
          <div className={`p-3 ${item.bgColor} rounded-full`}>{item.icon}</div>
        </Link>
      ))}
    </div>
  );
};

export default OverviewCards;
