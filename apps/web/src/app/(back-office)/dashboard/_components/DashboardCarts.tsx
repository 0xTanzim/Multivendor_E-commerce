'use client';

import {
  getTopSellingProducts,
  processSalesData,
} from '@/utils/chart/dataProcessors';
import BestSellingProductChart from './BestSellingProductChart';
import { DashboardOrder, DashboardSale } from './types';
import WeeklySalesChart from './WeeklySalesChart';

type DashboardCartsProps = {
  sales: DashboardSale[];
  orders: DashboardOrder[];
};

const DashboardCarts = ({ sales, orders }: DashboardCartsProps) => {
  // Process data for charts
  const processedSalesData = processSalesData(sales);
  const topSellingProducts = getTopSellingProducts(orders);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeeklySalesChart salesData={processedSalesData} rawSales={sales} />
      <BestSellingProductChart productData={topSellingProducts} />
    </div>
  );
};

export default DashboardCarts;
