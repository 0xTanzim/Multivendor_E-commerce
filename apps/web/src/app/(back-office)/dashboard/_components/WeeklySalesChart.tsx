'use client';

import {
  processMonthlyData,
  processSalesData,
  processYearlyData,
} from '@/utils/chart/dataProcessors';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { DashboardSale } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Sales Performance',
    },
  },
};

type TimePeriod = 'weekly' | 'monthly' | 'yearly';

type WeeklySalesChartProps = {
  salesData?: {
    date: string;
    dayName: string;
    totalSales: number;
    count: number;
  }[];
  rawSales?: DashboardSale[];
};

const WeeklySalesChart = ({
  salesData = [],
  rawSales = [],
}: WeeklySalesChartProps) => {
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimePeriod>('weekly');
  const [processedData, setProcessedData] = useState(salesData);
  const [mounted, setMounted] = useState(false);

  // Ensure hydration is complete before rendering charts
  useEffect(() => {
    setMounted(true);

    // Process data based on selected time period
    if (rawSales && rawSales.length > 0) {
      switch (selectedTimePeriod) {
        case 'weekly':
          setProcessedData(processSalesData(rawSales));
          break;
        case 'monthly':
          setProcessedData(processMonthlyData(rawSales));
          break;
        case 'yearly':
          setProcessedData(processYearlyData(rawSales));
          break;
      }
    } else {
      setProcessedData(salesData);
    }
  }, [selectedTimePeriod, rawSales, salesData]);

  // Use the actual labels from processed data
  const labels =
    processedData.length > 0 ? processedData.map((item) => item.dayName) : [];

  // Prepare chart data from the processed sales data
  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Sales ($)',
        data:
          processedData.length > 0
            ? processedData.map((day) => day.totalSales)
            : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const ordersChartData = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data:
          processedData.length > 0 ? processedData.map((day) => day.count) : [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const tabs = [
    {
      title: 'Sales',
      type: 'sales',
      data: salesChartData,
    },
    {
      title: 'Orders',
      type: 'orders',
      data: ordersChartData,
    },
  ];

  const [chartToDisplay, setChartToDisplay] = useState(
    tabs[0]?.type || 'sales'
  );

  if (!mounted) {
    return (
      <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">
            Loading chart data...
          </p>
        </div>
      </div>
    );
  }

  const periodTitles = {
    weekly: 'Weekly Performance',
    monthly: 'Monthly Performance',
    yearly: 'Yearly Performance',
  };

  return (
    <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50">
          {periodTitles[selectedTimePeriod]}
        </h2>

        {/* Time period selector */}
        <div className="flex space-x-2 text-sm">
          {Object.keys(periodTitles).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimePeriod(period as TimePeriod)}
              className={`px-3 py-1 rounded-md transition-colors ${
                selectedTimePeriod === period
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Tabs  */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab, index) => {
              return (
                <li className="me-2" key={index}>
                  <button
                    className={`inline-block p-4 ${
                      chartToDisplay === tab.type
                        ? 'text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500'
                        : 'border-b-2 border-transparent rounded-t-lg text-slate-800 dark:text-slate-100 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setChartToDisplay(tab.type)}
                  >
                    {tab.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content to display  */}
        {tabs.map((tab, index) => {
          if (chartToDisplay === tab.type) {
            return (
              <div className="mt-4" key={index}>
                <Line data={tab.data} options={options} />

                <div className="flex justify-center mt-4">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WeeklySalesChart;
