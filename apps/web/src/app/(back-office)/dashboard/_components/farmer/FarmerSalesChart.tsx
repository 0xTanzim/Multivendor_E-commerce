'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ISale } from '@repo/types';
import { useEffect, useState } from 'react';

type FarmerSalesChartProps = {
  sales: ISale[];
};

const FarmerSalesChart = ({ sales }: FarmerSalesChartProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [mounted, setMounted] = useState(false);

  // Ensure hydration is complete before rendering tabs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter sales for the selected time period
  const filteredSales = sales.filter((sale) => {
    // Check if createdAt exists before using it
    if (!sale.createdAt) return false;

    // Handle createdAt whether it's a string or Date
    const saleDate =
      typeof sale.createdAt === 'string'
        ? new Date(sale.createdAt)
        : sale.createdAt;

    const now = new Date();
    const daysToSubtract = timeRange === 'week' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(now.getDate() - daysToSubtract);

    return saleDate >= startDate;
  });

  // Filter sales for the previous period for comparison
  const previousPeriodSales = sales.filter((sale) => {
    if (!sale.createdAt) return false;

    const saleDate =
      typeof sale.createdAt === 'string'
        ? new Date(sale.createdAt)
        : sale.createdAt;

    const now = new Date();
    const daysToSubtract = timeRange === 'week' ? 7 : 30;
    const endDate = new Date();
    endDate.setDate(now.getDate() - daysToSubtract);

    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysToSubtract);

    return saleDate >= startDate && saleDate < endDate;
  });

  // Group sales by date with a fixed number of days
  const salesByDate: Record<
    string,
    { date: string; revenue: number; orders: number }
  > = {};

  // Ensure we have exactly 7 or 30 days based on time range
  const now = new Date();
  const daysToShow = timeRange === 'week' ? 7 : 30;

  // Get current month short name
  const currentMonth = now.toLocaleDateString('en-US', { month: 'short' });

  // Create empty entries for all days in range
  for (let i = daysToShow - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);

    // Use short format for date key
    const dateKey = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    // Use different format for display
    const displayDate =
      timeRange === 'week'
        ? `${currentMonth} ${date.getDate()}` // Use current month for week view
        : dateKey;

    salesByDate[dateKey] = {
      date: displayDate,
      revenue: 0,
      orders: 0,
    };
  }

  // Add sales data to the corresponding days
  filteredSales.forEach((sale) => {
    if (!sale.createdAt) return;

    const saleDate =
      typeof sale.createdAt === 'string'
        ? new Date(sale.createdAt)
        : sale.createdAt;

    const dateKey = saleDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    if (salesByDate[dateKey]) {
      salesByDate[dateKey].revenue += sale.total;
      salesByDate[dateKey].orders += 1;
    }
  });

  // Convert to array and ensure proper order
  const chartData = Object.values(salesByDate).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Calculate max values for proper scaling
  const maxRevenue = Math.max(...chartData.map((item) => item.revenue), 1); // Ensure not zero
  const maxOrders = Math.max(...chartData.map((item) => item.orders), 1); // Ensure not zero

  // Helper for generating the bar height percentage
  const getBarHeight = (value: number, max: number) => {
    return max ? Math.max((value / max) * 100, 2) : 0; // Minimum height for visibility
  };

  // Calculate performance metrics
  const currentTotalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );
  const previousTotalRevenue = previousPeriodSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const currentTotalOrders = filteredSales.length;
  const previousTotalOrders = previousPeriodSales.length;

  if (!mounted) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p>Loading sales data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>
              Last {timeRange === 'week' ? '7' : '30'} days sales performance
            </CardDescription>
          </div>
          <Tabs
            defaultValue="week"
            value={timeRange}
            onValueChange={(value: string) =>
              setTimeRange(value as 'week' | 'month')
            }
            className="w-full sm:w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-start gap-6 text-sm pt-2">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-muted-foreground">Orders</span>
            </div>
          </div>

          <div className="h-[200px] flex justify-center">
            <div className="w-full h-full flex items-end">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end h-full relative"
                >
                  <div className="w-full flex items-end justify-center space-x-1 h-[180px]">
                    {/* Revenue bar */}
                    <div
                      className="w-1/3 bg-blue-500 rounded-t relative"
                      style={{
                        height: `${getBarHeight(item.revenue, maxRevenue)}%`,
                      }}
                      title={`Revenue: $${item.revenue.toFixed(2)}`}
                    >
                      {item.revenue > 0 && (
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-500 dark:text-blue-300 hidden md:block">
                          ${item.revenue.toFixed(0)}
                        </span>
                      )}
                    </div>

                    {/* Orders bar */}
                    <div
                      className="w-1/3 bg-green-500 rounded-t relative"
                      style={{
                        height: `${getBarHeight(item.orders, maxOrders)}%`,
                      }}
                      title={`Orders: ${item.orders}`}
                    >
                      {item.orders > 0 && (
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-500 dark:text-green-300 hidden md:block">
                          {item.orders}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date label - show below the bar */}
                  <div className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                    {timeRange === 'week'
                      ? item.date.split(' ')[1]
                      : item.date.split(' ')[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">
                ${currentTotalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{currentTotalOrders}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerSalesChart;
