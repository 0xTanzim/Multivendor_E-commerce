import { ISale } from '@repo/types';
import LargeCard from './LargeCard';
type LargeCardsProps = {
  sales: ISale[];
};

const LargeCards = ({ sales }: LargeCardsProps) => {
  const totalSale =
    sales.reduce((acc, item) => acc + item.total, 0).toFixed(2) ?? 0;

  const today = new Date();

  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const todaySales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt ?? new Date());
      return saleDate.toDateString() === today.toDateString();
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisWeekSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt ?? new Date());
      return saleDate >= thisWeekStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const thisMonthSales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt ?? new Date());
      return saleDate >= thisMonthStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  const orderStats = [
    {
      period: 'Todays Orders',
      sales: todaySales,
      color: 'bg-green-600',
      icon: 'Layers',
    },
    {
      period: 'This Week',
      sales: thisWeekSales,
      color: 'bg-blue-600',
      icon: 'Layers',
    },
    {
      period: 'This Month',
      sales: thisMonthSales,
      color: 'bg-orange-600',
      icon: 'Cart',
    },
    {
      period: 'All Time Sales',
      sales: totalSale,
      color: 'bg-purple-600',
      icon: 'Calendar',
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
      {orderStats.map((order, index) => (
        <LargeCard key={index} data={order} />
      ))}
    </div>
  );
};

export default LargeCards;
