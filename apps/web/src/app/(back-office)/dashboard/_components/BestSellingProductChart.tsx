'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type BestSellingProductChartProps = {
  productData?: {
    name: string;
    count: number;
  }[];
};

const BestSellingProductChart = ({
  productData = [],
}: BestSellingProductChartProps) => {
  // Default colors for the chart
  const backgroundColors = [
    '#1E3A8A', // Deep blue
    '#9333EA', // Purple
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#8B5CF6', // Violet
    '#EC4899', // Pink
  ];

  // Use actual product data if available, or fallback to default data
  const labels =
    productData.length > 0
      ? productData.map((item) => item.name)
      : ['Cabbage', 'Watermelon', 'Broccoli', 'Maize'];

  const counts =
    productData.length > 0
      ? productData.map((item) => item.count)
      : [60, 46, 33, 15];

  const data = {
    labels,
    datasets: [
      {
        label: 'Units Sold',
        data: counts,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 mb-4">
        Best Selling Products
      </h2>
      <div className="p-4">
        {productData.length > 0 ? (
          <Pie data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              No product data available
            </p>
            <Pie data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellingProductChart;
