"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const WeeklySalesChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const tabs = [
    {
      title: "Sales",
      type: "sales",
      data: {
        labels,
        datasets: [
          {
            label: "Sales",
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      title: "Orders",
      type: "orders",
      data: {
        labels,
        datasets: [
          {
            label: "Orders",
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      },
    },
  ];

  const [chartToDisplay, setCharToDisplay] = useState(tabs[0].type);

  return (
    <div className="dark:bg-slate-800 bg-slate-50 shadow-sm p-8 rounded-lg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50">
        Weekly Sales
      </h2>
      <div className="p-4">
        {/* Tabs  */}

        <div className="text-sm font-medium text-center text-gray-200 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab, index) => {
              return (
                <li className="me-2" key={index}>
                  <button
                    className={`inline-block p-4  ${
                      chartToDisplay === tab.type
                        ? "text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500"
                        : "border-b-2 border-transparent rounded-t-lg text-slate-800 dark:text-slate-100 hover:text-gray-700 hover:border-gray-100 dark:hover:text-gray-100"
                    }`}
                    onClick={() => setCharToDisplay(tab.type)}
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
                  <button className="btn btn-primary">View More</button>
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

