import React from "react";
import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

const MapView = () => {
  const source = new VectorSource();
  const vector = new VectorLayer({ source: source });
  let feature;

  const draw = new Draw({
    source: source,
    type: "Point",
  });

  function removeLastFeature() {
    if (feature) source.removeFeature(feature);
  }

  draw.on("drawend", (event) => {
    removeLastFeature(feature);
    feature = event.feature;
  });

  React.useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vector,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    map.addInteraction(draw);

    return () => {
      map.setTarget(null);
    };
  }, []);
  return <div id="map" style={{ width: "50%", height: "100vh" }} />;
};

export default MapView;
