import React from 'react';
import './ShaderBackground.css';

const ShaderBackground: React.FC = () => {
  return (
    <div className="shader-container">
      <div className="shader-gradient"></div>
      <div className="shader-noise"></div>
      <div className="shader-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </div>
  );
};

export default ShaderBackground;
