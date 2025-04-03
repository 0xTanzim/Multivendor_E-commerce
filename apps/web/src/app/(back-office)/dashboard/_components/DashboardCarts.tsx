import { IOrder, ISale } from '@repo/types';
import BestSellingProductChart from './BestSellingProductChart';
import WeeklySalesChart from './WeeklySalesChart';

type DashboardCartsProps = {
  sales: ISale[];
  orders: IOrder[];
};

const DashboardCarts = ({ sales, orders }: DashboardCartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WeeklySalesChart sales={sales} orders={orders} />
      <BestSellingProductChart orders={orders} />
    </div>
  );
};

export default DashboardCarts;
