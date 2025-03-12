// Generate mock spectrum data (FFT)
export function generateSpectrumData(centerFreq, span) {
  const dataPoints = 512;
  const freqStep = span / dataPoints;
  const startFreq = centerFreq - span / 2;
  
  const data = {
    labels: [],
    datasets: [{
      label: 'Power (dBm)',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      pointRadius: 0,
      tension: 0.4
    }]
  };
  
  for (let i = 0; i < dataPoints; i++) {
    const freq = startFreq + i * freqStep;
    data.labels.push(freq.toFixed(3));
    
    // Simulate some peaks and noise
    let power = -90 + Math.random() * 10; // Base noise level
    
    // Add some peaks at random positions
    const peakPositions = [0.2, 0.5, 0.7].map(p => Math.floor(p * dataPoints));
    
    if (peakPositions.some(pos => Math.abs(i - pos) < 5)) {
      power += 40 * Math.exp(-Math.pow(i - peakPositions.find(pos => Math.abs(i - pos) < 5), 2) / 5);
    }
    
    data.datasets[0].data.push(power);
  }
  
  return data;
}

// Generate mock bearing data
export function generateBearingData() {
  // Simulate a bearing between 0 and 359 degrees
  const bearing = Math.floor(Math.random() * 360);
  
  // Generate waterfall data (simplified)
  const waterfall = Array(30).fill().map(() => {
    return Array(256).fill().map(() => Math.floor(Math.random() * 100));
  });
  
  return { bearing, waterfall };
}

// Generate mock IQ data
export function generateIQData() {
  const samples = 1000;
  
  const iData = [];
  const qData = [];
  const timeData = [];
  
  // Simulate a sine wave with some noise
  for (let i = 0; i < samples; i++) {
    const time = i / samples;
    timeData.push(time);
    
    // Simulate I/Q signals as sine waves with noise
    iData.push(Math.sin(2 * Math.PI * 10 * time) + (Math.random() - 0.5) * 0.2);
    qData.push(Math.cos(2 * Math.PI * 10 * time) + (Math.random() - 0.5) * 0.2);
  }
  
  return {
    labels: timeData,
    datasets: [
      {
        label: 'I',
        data: iData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 0,
        borderWidth: 1
      },
      {
        label: 'Q',
        data: qData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 0,
        borderWidth: 1
      }
    ]
  };
}