// filepath: /mnt/storage/ecommerce/apps/web/src/utils/chart/dataProcessors.ts
import {
  DashboardOrder,
  DashboardSale,
} from '@/app/(back-office)/dashboard/_components/types';
import { IOrder, ISale } from '@repo/types';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

/**
 * Processes sales data for chart visualization
 * @param sales Array of sales data
 * @returns Processed sales data suitable for charting
 */
export const processSalesData = (sales: DashboardSale[] | ISale[]) => {
  if (!sales || !Array.isArray(sales) || sales.length === 0) {
    return [];
  }

  // Get current week date range
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = endOfWeek(today);

  // Create array of days in current week
  const daysInWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });

  // Initialize data with zero values for each day
  const weeklyData = daysInWeek.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    dayName: format(day, 'EEE'),
    totalSales: 0,
    count: 0,
  }));

  // Aggregate sales by day
  sales.forEach((sale) => {
    if (sale.createdAt) {
      const saleDate = new Date(sale.createdAt);
      const dateStr = format(saleDate, 'yyyy-MM-dd');

      const dayData = weeklyData.find((d) => d.date === dateStr);
      if (dayData) {
        // Handle different property names for sales amount
        const amount = (sale as any).amount || (sale as any).total || 0;
        dayData.totalSales += amount;
        dayData.count += 1;
      }
    }
  });

  return weeklyData;
};

/**
 * Processes order data for chart visualization
 * @param orders Array of order data
 * @returns Processed order data suitable for charting
 */
export const processOrderData = (orders: DashboardOrder[] | IOrder[]) => {
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return [];
  }

  // Initialize status counters
  const statusCounts: Record<string, number> = {
    PENDING: 0,
    PROCESSING: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
  };

  // Count orders by status
  orders.forEach((order) => {
    // Use type assertion to access status property
    const dashboardOrder = order as DashboardOrder;
    const status = dashboardOrder.status;

    if (status && Object.prototype.hasOwnProperty.call(statusCounts, status)) {
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    }
  });

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));
};

/**
 * Extracts top selling products data from orders
 * @param orders Array of order data
 * @param limit Number of top products to return
 * @returns Array of top selling products with count
 */
export const getTopSellingProducts = (
  orders: DashboardOrder[] | IOrder[],
  limit = 5
) => {
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return [];
  }

  // Create a map to count product occurrences
  const productCounts = new Map();

  // Count products in all orders
  orders.forEach((order) => {
    // Use type assertion to access items property
    const dashboardOrder = order as DashboardOrder;
    const items = dashboardOrder.items;

    if (items && Array.isArray(items)) {
      items.forEach((item) => {
        if (item && item.product) {
          const productId = item.product.id;
          const productName = item.product.name;
          const currentCount = productCounts.get(productId) || {
            name: productName,
            count: 0,
          };
          productCounts.set(productId, {
            name: productName,
            count: currentCount.count + (item.quantity || 1),
          });
        }
      });
    }
  });

  // Convert map to array, sort by count, and limit results
  return Array.from(productCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
