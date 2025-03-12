import React from 'react';

export default function ConnectionStatus({ status }) {
  let statusClass = '';
  let statusText = '';
  
  switch (status) {
    case 'connected':
      statusClass = 'connected';
      statusText = 'Connected';
      break;
    case 'connecting':
      statusClass = 'connecting';
      statusText = 'Connecting...';
      break;
    case 'disconnected':
    default:
      statusClass = 'disconnected';
      statusText = 'Disconnected';
      break;
  }
  
  return (
    <div className="connection-status">
      <span className={`indicator ${statusClass}`}></span>
      <span className="status-text">{statusText}</span>
    </div>
  );
}