import { useState, useEffect } from 'react';
import './Loader.css';


const Loader = ({delay}) => {
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    // Option to delay display of animated loader for longer resolutions
    setTimeout(() => {
      setShow(true);
    }, delay);
  }, []);

  return (
    <>
      {show &&
      <div>
        <div className="center"></div>
        <div className="inner-spin">
          <div className="inner-arc inner-arc_start-a"></div>
          <div className="inner-arc inner-arc_end-a"></div>
          <div className="inner-arc inner-arc_start-b"></div>
          <div className="inner-arc inner-arc_end-b"></div>
          
          <div className="inner-moon-a"></div>
          <div className="inner-moon-b"></div>
        </div>
        <div className="outer-spin">
          <div className="outer-arc outer-arc_start-a"></div>
          <div className="outer-arc outer-arc_end-a"></div>
          <div className="outer-arc outer-arc_start-b"></div>
          <div className="outer-arc outer-arc_end-b"></div>
          <div className="outer-moon-a"></div>
          <div className="outer-moon-b"></div>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
      }
    </>
  );
};

export default Loader;