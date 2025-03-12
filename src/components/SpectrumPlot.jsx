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

export default function SpectrumPlot({ data, centerFreq, span }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Spectrum (${(centerFreq - span/2).toFixed(1)} - ${(centerFreq + span/2).toFixed(1)} MHz)`,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (MHz)',
        },
        ticks: {
          maxTicksLimit: 10,
          callback: function(value, index) {
            const labelVal = this.getLabelForValue(index);
            return index % 50 === 0 ? parseFloat(labelVal).toFixed(1) : '';
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Power (dBm)',
        },
        min: -100,
        max: -20,
      },
    },
    animation: false, // Disable animations for better performance
  };
  
  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No spectrum data available</p>
          <p className="text-sm text-gray-400 mt-2">Connect to an SDR device to view spectrum</p>
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