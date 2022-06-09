import { useState, useEffect, useRef } from 'react';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';

import { TethysAppPropType } from '../../components/propTypes';

import 'ol/ol.css';

// eslint-disable-next-line no-unused-vars
function Home({tethysApp}) {
  const [map, setMap] = useState(null);
  const mapWrapper = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    // Skip if the mapWrapper element already has content in it
    if (mapWrapper.current.childNodes.length !== 0) {
      return;
    }

    // Create map element
    let mapContainer = document.createElement("div");
    mapContainer.style = "height: calc(100vh - 56px); width: 100%; overflow-y: hidden;";
    mapContainer.dataset.testid = 'map-container';
    mapWrapper.current.append(mapContainer);

    const clydeBldg = new Feature({
      geometry: new Point(fromLonLat([-111.648149, 40.247094])),
    });

    clydeBldg.setStyle(
      new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: '#002E5D',
          }),
          stroke: new Stroke({
            color: 'white',
            width: 3
          })
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [clydeBldg],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialMap = new Map({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        // Birth place of Tethys Platform
        center: [-12428615.094691524, 4901914.543610684],  // EPSG:3857
        zoom: 5,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div ref={mapWrapper} data-testid="map-wrapper"></div>
  );
}

Home.propTypes = {
  tethysApp: TethysAppPropType,
};

export default Home;
