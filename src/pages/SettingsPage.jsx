import React from 'react';

export default function SettingsPage({ 
  connectionStatus, 
  deviceConfig, 
  setDeviceConfig, 
  onConnect, 
  onDisconnect 
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceConfig({
      ...deviceConfig,
      [name]: name === 'centerFreq' || name === 'span' ? parseFloat(value) : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (connectionStatus === 'disconnected') {
      onConnect();
    } else {
      onDisconnect();
    }
  };
  
  const isConnected = connectionStatus === 'connected';
  const isConnecting = connectionStatus === 'connecting';
  
  return (
    <div className="h-full w-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">SDR Device Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Device Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={deviceConfig.address}
            onChange={handleInputChange}
            disabled={isConnected || isConnecting}
            placeholder="192.168.1.100"
            className="box-border"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={deviceConfig.username}
            onChange={handleInputChange}
            disabled={isConnected || isConnecting}
            placeholder="admin"
            className="box-border"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={deviceConfig.password}
            onChange={handleInputChange}
            disabled={isConnected || isConnecting}
            placeholder="password"
            className="box-border"
          />
        </div>
        
        <div className="slider-container mt-8 mb-4">
          <label htmlFor="centerFreq">Center Frequency (MHz)</label>
          <input
            type="range"
            id="centerFreq"
            name="centerFreq"
            min="50"
            max="1500"
            step="1"
            value={deviceConfig.centerFreq}
            onChange={handleInputChange}
            disabled={!isConnected}
          />
          <div className="value">{deviceConfig.centerFreq} MHz</div>
        </div>
        
        <div className="slider-container mb-8">
          <label htmlFor="span">Frequency Span (MHz)</label>
          <input
            type="range"
            id="span"
            name="span"
            min="1"
            max="100"
            step="1"
            value={deviceConfig.span}
            onChange={handleInputChange}
            disabled={!isConnected}
          />
          <div className="value">{deviceConfig.span} MHz</div>
        </div>
        
        <div className="text-sm text-gray-500 mb-6">
          Frequency Range: {(deviceConfig.centerFreq - deviceConfig.span/2).toFixed(1)} MHz to {(deviceConfig.centerFreq + deviceConfig.span/2).toFixed(1)} MHz
        </div>
        
        <button 
          type="submit" 
          className={`btn w-full ${isConnected ? 'btn-danger' : 'btn-primary'} cursor-pointer`}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </form>
    </div>
  );
}