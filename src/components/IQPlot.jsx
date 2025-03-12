import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IQPlot({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'IQ Time Domain Data',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          maxTicksLimit: 10,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude',
        },
        min: -1.5,
        max: 1.5,
      },
    },
    animation: false, // Disable animations for better performance
  };
  
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No IQ data available</p>
          <p className="text-sm text-gray-400 mt-2">Connect to an SDR device to view IQ data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full p-4">
      <Line options={options} data={data} />
    </div>
  );
}