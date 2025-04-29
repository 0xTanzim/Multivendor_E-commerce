'use client';

import { Card } from '@/components/ui/card';
import { ISale, Product } from '@repo/types';
import { Banknote, Package2, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type FarmerOverviewCardsProps = {
  products: Product[];
  sales: ISale[];
};

const FarmerOverviewCards = ({ products, sales }: FarmerOverviewCardsProps) => {
  // Calculate key metrics
  const productsCount = products.length.toString().padStart(2, '0');
  const salesCount = sales.length.toString().padStart(2, '0');
  const totalRevenue = sales
    .reduce((acc, item) => acc + item.total, 0)
    .toFixed(2);

  // Calculate average order value
  const averageOrderValue = sales.length
    ? (sales.reduce((acc, item) => acc + item.total, 0) / sales.length).toFixed(
        2
      )
    : '0.00';

  const analytics = [
    {
      title: 'Active Products',
      count: productsCount,
      unit: '',
      link: '/dashboard/products',
      icon: <Package2 className="w-6 h-6 text-blue-600" />,
      bgColorClass: 'bg-blue-50 dark:bg-blue-900/20',
      textColorClass: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Orders',
      count: salesCount,
      unit: '',
      link: '/dashboard/sales',
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
      bgColorClass: 'bg-green-50 dark:bg-green-900/20',
      textColorClass: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Revenue',
      count: totalRevenue,
      unit: '$',
      link: '/dashboard/sales',
      icon: <Banknote className="w-6 h-6 text-purple-600" />,
      bgColorClass: 'bg-purple-50 dark:bg-purple-900/20',
      textColorClass: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Avg. Order Value',
      count: averageOrderValue,
      unit: '$',
      link: '/dashboard/analytics',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      bgColorClass: 'bg-amber-50 dark:bg-amber-900/20',
      textColorClass: 'text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {analytics.map((item) => (
        <Card key={item.title} className="overflow-hidden">
          <Link
            href={item.link}
            className="flex items-center p-6 transition-all hover:bg-muted/50"
          >
            <div className={`p-3 rounded-lg mr-4 ${item.bgColorClass}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <h3 className={`text-2xl font-bold ${item.textColorClass}`}>
                {item.unit}
                {item.count}
              </h3>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default FarmerOverviewCards;
