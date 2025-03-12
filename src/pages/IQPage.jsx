import React from 'react';
import IQPlot from '../components/IQPlot';

export default function IQPage({ iqData }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold">IQ Time Domain</h1>
        <div className="text-sm text-gray-500">
          Raw I/Q samples
        </div>
      </div>
      
      <div className="flex-grow overflow-hidden">
        <IQPlot data={iqData} />
      </div>
    </div>
  );
}