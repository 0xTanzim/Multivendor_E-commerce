'use client';

import LargeCards from '@/components/backOffice/card/LargeCards';
import SmallCards from '@/components/backOffice/card/SmallCards';
import Heading from '@/components/backOffice/layout/Heading';
import { IOrder, ISale, Product } from '@repo/types';
import { useEffect, useState } from 'react';
import CustomDataTable from './CustomDataTable';
import DashboardCarts from './DashboardCarts';
import { DashboardOrder, DashboardProduct, DashboardSale } from './types';

type AdminDashboardProps = {
  sales: ISale[];
  orders: IOrder[];
  products: Product[];
  totalProducts: number;
};

const AdminDashboard = ({
  sales,
  orders,
  products,
  totalProducts,
}: AdminDashboardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Convert to dashboard types
  const dashboardOrders = orders as unknown as DashboardOrder[];
  const dashboardSales = sales as unknown as DashboardSale[];
  const dashboardProducts = products as unknown as DashboardProduct[];

  // Get most recent orders for the table display
  const recentOrders = [...dashboardOrders]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 20); // Show 20 most recent orders

  return (
    <div className="space-y-8">
      <Heading title="Admin Dashboard" />

      {/* Overview Cards */}
      {/* <OverviewCards
        totalSales={dashboardSales.reduce(
          (acc, sale) => acc + (sale.total || sale.amount || 0),
          0
        )}
        totalOrders={dashboardOrders.length}
        totalProducts={totalProducts}
        pendingOrders={
          dashboardOrders.filter((order) => order.status === 'PENDING').length
        }
      /> */}

      {/* Large Card for Sales Overview */}
      <LargeCards sales={sales} />

      {/* Small Cards for Order Stats */}
      <SmallCards orders={orders} />

      {/* Charts Section */}
      <DashboardCarts sales={dashboardSales} orders={dashboardOrders} />

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
          Recent Orders
        </h3>
        <CustomDataTable orders={recentOrders} />
      </div>
    </div>
  );
};

export default AdminDashboard;
