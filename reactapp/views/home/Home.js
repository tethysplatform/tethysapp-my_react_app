import Feature from 'ol/Feature';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import Popover from 'react-bootstrap/Popover';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { useState, useEffect, useRef } from 'react';

import { TethysAppPropType } from '../../components/propTypes';

import 'ol/ol.css';

// eslint-disable-next-line no-unused-vars
function Home({tethysApp}) {
  const [map, setMap] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const mapWrapperRef = useRef();
  const mapRef = useRef();
  const popupRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    // Skip if the mapWrapper element already has content in it
    if (mapWrapperRef.current.childNodes.length !== 0) {
      return;
    }

    // Create map element
    let mapContainer = document.createElement("div");
    mapContainer.style = "height: calc(100vh - 56px); width: 100%; overflow-y: hidden;";
    mapContainer.dataset.testid = 'map-container';
    mapWrapperRef.current.append(mapContainer);

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

    const cldBldgCoord = [-12428615.094691524, 4901914.543610684];
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
        center: cldBldgCoord,  // EPSG:3857
        zoom: 5,
      }),
    });

    // Setup the select interaction
    const selectedStyle =  new Style({
      image: new Circle({
        radius: 10,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 3
        })
      }),
    });

    const selectInteraction = new Select({style: selectedStyle});
    initialMap.addInteraction(selectInteraction);

    // Initialize popup
    const popup = new Overlay({
      element: popupRef.current,
      positioning: 'top-center',
    });
    initialMap.addOverlay(popup);

    // Create popup when selected
    selectInteraction.on('select', (evt) => {
      const pos = evt.selected.length > 0 ? cldBldgCoord : null;
      setShowPopover(evt.selected.length > 0);
      popup.setPosition(pos);
    });
  
    setMap(initialMap);
  }, []);

  return (
    <>
      <div ref={mapWrapperRef} data-testid="map-wrapper"></div>
      <div ref={popupRef} data-testid="map-popup">
        <Popover show={showPopover} placement="top-end">
          <Popover.Header as="h3">Birthplace of Tethys Platform</Popover.Header>
          <Popover.Body style={{minWidth: "250px"}}>BYU Clyde Engineering Building circa 2012</Popover.Body>
        </Popover>
      </div>
    </>
  );
}

Home.propTypes = {
  tethysApp: TethysAppPropType,
};

export default Home;
