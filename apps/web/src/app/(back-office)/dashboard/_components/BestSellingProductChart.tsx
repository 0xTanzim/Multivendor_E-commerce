"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const BestSellingProductChart = () => {
  const data = {
    labels: ["GCabbage", "Watermelon", "Broccoli", "Maize"],
    datasets: [
      {
        label: "# of Votes",
        data: [60, 46, 33, 15],
        backgroundColor: [
          "#1E3A8A",
          "#9333EA", 
          "#10B981",
          "#F59E0B", 
        ],
        borderColor: [
          "#1E3A8A", 
          "#9333EA", 
          "#10B981", 
          "#F59E0B", 
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50">Best Selling Product Chart</h2>
      <div className="p-4">
      <Pie data={data} />
      </div>
    </div>
  );
};

export default BestSellingProductChart;

