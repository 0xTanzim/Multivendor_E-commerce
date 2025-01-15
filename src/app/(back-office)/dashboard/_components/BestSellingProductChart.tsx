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
          "rgba(0, 0, 255, 0.7)",
          "rgba(255, 0, 221, 0.7)",
          "rgba(2, 139, 71, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(0, 0, 255, 0.3)",
          "rgba(255, 0, 221, 0.3)",
          "rgba(2, 139, 71, 0.3)",
          "rgba(75, 192, 192, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-slate-800 p-8 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Best Selling Product Chart</h2>
      <div className="p-4">
      <Pie data={data} />
      </div>
    </div>
  );
};

export default BestSellingProductChart;

