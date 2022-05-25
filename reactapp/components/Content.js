import React from 'react';
import { TethysAppPropType } from './propTypes';
import GraphicsWindow from './GraphicsWindow';


const Content = ({tethysApp}) => {
  return (
    <div className="primary-content-wrapper">
        <GraphicsWindow tethysApp={tethysApp} />
    </div>
  );
};

Content.propTypes = {
  tethysApp: TethysAppPropType,
};

export default Content;