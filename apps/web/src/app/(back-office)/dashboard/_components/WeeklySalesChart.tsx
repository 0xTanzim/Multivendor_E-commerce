'use client';

import { useState } from 'react';
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
  salesData: {
    date: string;
    dayName: string;
    totalSales: number;
    count: number;
  }[];
};

const WeeklySalesChart = ({ salesData = [] }: WeeklySalesChartProps) => {
  // Define time periods for better data visualization
  const timePeriods: Record<TimePeriod, string[]> = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    yearly: ['2020', '2021', '2022', '2023', '2024', '2025'],
  };

  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimePeriod>('weekly');

  // Use the actual day names from processed data if available
  const labels =
    salesData.length > 0
      ? salesData.map((day) => day.dayName)
      : timePeriods[selectedTimePeriod];

  // Prepare chart data from the processed sales data
  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data:
          salesData.length > 0
            ? salesData.map((day) => day.totalSales)
            : labels.map(() => Math.floor(Math.random() * 4000) + 1000),
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
          salesData.length > 0
            ? salesData.map((day) => day.count)
            : labels.map(() => Math.floor(Math.random() * 30) + 5),
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

  return (
    <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50">
          {selectedTimePeriod.charAt(0).toUpperCase() +
            selectedTimePeriod.slice(1)}{' '}
          Performance
        </h2>

        {/* Time period selector */}
        <div className="flex space-x-2 text-sm">
          {Object.keys(timePeriods).map((period) => (
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
                    className={`inline-block p-4  ${
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
