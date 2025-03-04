import { Layer, Source } from "react-map-gl/mapbox";
function MapRoute({ coordinates }: { coordinates: Array<Array<number>> }) {
  return (
    <Source
      id="my-data"
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: coordinates },
        properties: {},
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
}

export default MapRoute;
