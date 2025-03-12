import { useState, useEffect, useCallback, useRef } from 'react';
import { generateSpectrumData, generateBearingData, generateIQData } from '../utils/mockData';

export default function useSDRConnection() {
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  const [deviceConfig, setDeviceConfig] = useState({
    address: '192.168.1.100',
    username: 'admin',
    password: 'password',
    centerFreq: 100, // MHz
    span: 20, // MHz
  });
  
  // Store the current data
  const [spectrumData, setSpectrumData] = useState(null);
  const [bearingData, setBearingData] = useState(null);
  const [iqData, setIQData] = useState(null);
  
  // Reference to the update interval
  const dataUpdateInterval = useRef(null);
  
  // Function to attempt connection
  const connect = useCallback(() => {
    console.log('Attempting to connect to:', deviceConfig.address);
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      console.log('Connected to SDR device');
      
      // Start updating data periodically
      if (dataUpdateInterval.current) {
        clearInterval(dataUpdateInterval.current);
      }
      
      dataUpdateInterval.current = setInterval(() => {
        setSpectrumData(generateSpectrumData(deviceConfig.centerFreq, deviceConfig.span));
        setBearingData(generateBearingData());
        setIQData(generateIQData());
      }, 1000); // Update every second
      
      // Initial data population
      setSpectrumData(generateSpectrumData(deviceConfig.centerFreq, deviceConfig.span));
      setBearingData(generateBearingData());
      setIQData(generateIQData());
    }, 1500);
  }, [deviceConfig]);
  
  // Function to disconnect
  const disconnect = useCallback(() => {
    console.log('Disconnecting from SDR device');
    
    if (dataUpdateInterval.current) {
      clearInterval(dataUpdateInterval.current);
      dataUpdateInterval.current = null;
    }
    
    setConnectionStatus('disconnected');
  }, []);
  
  // Update data when frequency settings change
  useEffect(() => {
    if (connectionStatus === 'connected') {
      console.log('Updating data due to frequency change:', deviceConfig.centerFreq, deviceConfig.span);
      setSpectrumData(generateSpectrumData(deviceConfig.centerFreq, deviceConfig.span));
    }
  }, [deviceConfig.centerFreq, deviceConfig.span, connectionStatus]);
  
  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (dataUpdateInterval.current) {
        clearInterval(dataUpdateInterval.current);
      }
    };
  }, []);
  
  return {
    connectionStatus,
    deviceConfig,
    setDeviceConfig,
    spectrumData,
    bearingData,
    iqData,
    connect,
    disconnect
  };
}