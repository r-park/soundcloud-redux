import React from 'react';

import './loading-indicator.css';


function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="circle circle--1" />
      <div className="circle circle--2" />
      <div className="circle circle--3" />
    </div>
  );
}

export default LoadingIndicator;
