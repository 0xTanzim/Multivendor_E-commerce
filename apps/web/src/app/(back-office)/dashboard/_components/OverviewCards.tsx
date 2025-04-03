import { ISale, Product } from '@repo/types';
import { LineChart, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

type OverviewCardsProps = {
  products: Product[];
  sales: ISale[];
};

const OverviewCards = ({ products, sales }: OverviewCardsProps) => {
  const productsCount = products.length.toString().padStart(2, '0');
  const salesCount = sales.length.toString().padStart(2, '0');
  const salesTotal = sales
    .reduce((acc, item) => acc + item.total, 0)
    .toFixed(2);

  const analytics = [
    {
      title: 'Products',
      count: productsCount,
      unit: '',
      link: '/dashboard/products',
      icon: <Package className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Sales',
      count: salesCount,
      unit: '',
      link: '/dashboard/sales',
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
    },
    {
      title: 'Total Sales',
      count: salesTotal,
      unit: '$',
      link: '/dashboard/sales',
      icon: <LineChart className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {analytics.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {item.unit}
              {item.count}
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OverviewCards;
