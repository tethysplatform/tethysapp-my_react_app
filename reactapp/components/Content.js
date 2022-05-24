import React from 'react';
import GraphicsWindow from './GraphicsWindow';


const Content = ({tethysApp}) => {
  return (
    <div className="primary-content-wrapper">
        <GraphicsWindow tethysApp={tethysApp} />
    </div>
  );
};

export default Content;