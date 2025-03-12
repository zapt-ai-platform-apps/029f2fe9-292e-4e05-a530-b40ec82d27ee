import React, { useRef, useEffect } from 'react';

export default function Waterfall({ data }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!data || !data.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions based on container
    const containerWidth = canvas.parentElement.clientWidth;
    canvas.width = containerWidth;
    canvas.height = data.length;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw waterfall
    const width = data[0].length;
    const pixelWidth = containerWidth / width;
    
    data.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        // Map value to color (0-100 to blue-green-red)
        const hue = (120 - value * 1.2) % 360; // Blue to green to red
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(colIndex * pixelWidth, rowIndex, pixelWidth, 1);
      });
    });
    
  }, [data]);
  
  if (!data || !data.length) {
    return (
      <div className="w-full h-2/5 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No waterfall data available</p>
      </div>
    );
  }
  
  return (
    <div className="w-full h-2/5 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}