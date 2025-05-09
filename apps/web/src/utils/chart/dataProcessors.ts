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
    const items = dashboardOrder.OrderItem;

    if (items && Array.isArray(items)) {
      items.forEach((item) => {
        if (item && item.product) {
          const productId = item.product.id;
          const productName = item.product.name;
          const currentCount = productCounts.get(productId) || {
            name: productName,
            quantity: 0,
          };
          productCounts.set(productId, {
            name: productName,
            quantity: currentCount.quantity + (item.quantity || 1),
          });
        }
      });
    }
  });

  // Convert map to array, sort by count, and limit results
  return Array.from(productCounts.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
};

/**
 * Processes sales data for monthly visualization
 * @param sales Array of sales data
 * @returns Processed sales data suitable for monthly charting
 */
export const processMonthlyData = (sales: DashboardSale[] | ISale[]) => {
  if (!sales || !Array.isArray(sales) || sales.length === 0) {
    return [];
  }

  // Initialize monthly data
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    date: format(new Date(new Date().getFullYear(), i, 1), 'yyyy-MM'),
    dayName: format(new Date(new Date().getFullYear(), i, 1), 'MMM'),
    totalSales: 0,
    count: 0,
  }));

  // Aggregate sales by month
  sales.forEach((sale) => {
    if (sale.createdAt) {
      const saleDate = new Date(sale.createdAt);
      const monthIndex = saleDate.getMonth();
      const year = saleDate.getFullYear();
      const currentYear = new Date().getFullYear();

      // Only include sales from current year
      if (year === currentYear) {
        const amount = (sale as any).amount || (sale as any).total || 0;
        if (monthlyData[monthIndex]) {
          monthlyData[monthIndex].totalSales += amount;
          monthlyData[monthIndex].count += 1;
        }
      }
    }
  });

  return monthlyData;
};

/**
 * Processes sales data for yearly visualization
 * @param sales Array of sales data
 * @param years Number of years to go back
 * @returns Processed sales data suitable for yearly charting
 */
export const processYearlyData = (
  sales: DashboardSale[] | ISale[],
  years = 5
) => {
  if (!sales || !Array.isArray(sales) || sales.length === 0) {
    return [];
  }

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Initialize yearly data
  const yearlyData = Array.from({ length: years }, (_, i) => {
    const year = currentYear - years + i + 1;
    return {
      date: year.toString(),
      dayName: year.toString(),
      totalSales: 0,
      count: 0,
    };
  });

  // Aggregate sales by year
  sales.forEach((sale) => {
    if (sale.createdAt) {
      const saleDate = new Date(sale.createdAt);
      const saleYear = saleDate.getFullYear();

      // Find the corresponding year in our data array
      const yearData = yearlyData.find(
        (item) => parseInt(item.date) === saleYear
      );
      if (yearData) {
        const amount = (sale as any).amount || (sale as any).total || 0;
        yearData.totalSales += amount;
        yearData.count += 1;
      }
    }
  });

  return yearlyData;
};
