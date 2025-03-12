import React from 'react';
import SpectrumPlot from '../components/SpectrumPlot';

export default function SpectrumPage({ spectrumData, centerFreq, span }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold">RF Spectrum</h1>
        <div className="text-sm text-gray-500">
          {centerFreq} MHz ± {span/2} MHz
        </div>
      </div>
      
      <div className="flex-grow overflow-hidden">
        <SpectrumPlot 
          data={spectrumData} 
          centerFreq={centerFreq} 
          span={span} 
        />
      </div>
    </div>
  );
}