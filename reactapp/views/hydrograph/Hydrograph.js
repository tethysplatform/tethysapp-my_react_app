import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';

import LoadingAnimation from '../../components/loader/LoadingAnimation';

function Hydrograph() {
  const [ plotData, setPlotData ] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPlotData({
        data: [{
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        }],
        layout: {
          width: '100%', 
          height: '70vh', 
          title: 'A Fancy Plot'
        }
      });
    }, 500);
  }, []);

  if (!plotData) {
    return (
      <LoadingAnimation />
    );
  } else {
    return (
      <Container className="py-5" style={{ height: "calc(100vh - 56px)", overflowY: "hidden" }}>
        <Plot data={plotData.data} layout={plotData.layout} />
      </Container>
    );
  }
}

Hydrograph.propTypes = {};

export default Hydrograph;
