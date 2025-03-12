import React, { useEffect } from 'react';
import { animated } from '@react-spring/web';
import ConnectionStatus from './components/ConnectionStatus';
import SettingsPage from './pages/SettingsPage';
import SpectrumPage from './pages/SpectrumPage';
import BearingPage from './pages/BearingPage';
import IQPage from './pages/IQPage';
import useSDRConnection from './hooks/useSDRConnection';
import useSwipe from './hooks/useSwipe';

export default function App() {
  const { 
    connectionStatus, 
    deviceConfig, 
    setDeviceConfig,
    spectrumData,
    bearingData,
    iqData,
    connect,
    disconnect
  } = useSDRConnection();

  const PAGES_COUNT = 4;
  const { activeIndex, navigateTo, bind, style } = useSwipe(PAGES_COUNT);

  // Handle window resize to adjust spring position
  useEffect(() => {
    const handleResize = () => {
      navigateTo(activeIndex);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, navigateTo]);

  return (
    <div className="h-screen w-screen overflow-hidden text-gray-800 flex flex-col bg-gray-50">
      <ConnectionStatus status={connectionStatus} />
      
      <div className="flex-grow relative overflow-hidden">
        <animated.div 
          {...bind()}
          className="swipeable-container"
          style={{
            width: `${PAGES_COUNT * 100}%`,
            x: style.x
          }}
        >
          <div className="swipeable-page w-1/4">
            <SettingsPage 
              connectionStatus={connectionStatus}
              deviceConfig={deviceConfig}
              setDeviceConfig={setDeviceConfig}
              onConnect={connect}
              onDisconnect={disconnect}
            />
          </div>
          
          <div className="swipeable-page w-1/4 ml-[100%]">
            <SpectrumPage 
              spectrumData={spectrumData}
              centerFreq={deviceConfig.centerFreq}
              span={deviceConfig.span}
            />
          </div>
          
          <div className="swipeable-page w-1/4 ml-[200%]">
            <BearingPage bearingData={bearingData} />
          </div>
          
          <div className="swipeable-page w-1/4 ml-[300%]">
            <IQPage iqData={iqData} />
          </div>
        </animated.div>
      </div>
      
      <div className="page-indicator">
        {[...Array(PAGES_COUNT)].map((_, index) => (
          <div 
            key={index} 
            className={`dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => navigateTo(index)}
          />
        ))}
      </div>
      
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="made-on-zapt"
      >
        Made on ZAPT
      </a>
    </div>
  );
}