import React from 'react';
import PolarPlot from '../components/PolarPlot';
import Waterfall from '../components/Waterfall';

export default function BearingPage({ bearingData }) {
  if (!bearingData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No direction finding data available</p>
          <p className="text-sm text-gray-400 mt-2">Connect to an SDR device to view bearing data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold">Direction Finding</h1>
        <div className="text-sm text-gray-500">
          Bearing: {bearingData.bearing}°
        </div>
      </div>
      
      <div className="flex-grow flex flex-col overflow-hidden">
        <PolarPlot bearing={bearingData.bearing} />
        <Waterfall data={bearingData.waterfall} />
      </div>
    </div>
  );
}