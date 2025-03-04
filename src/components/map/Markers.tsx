import { Marker } from "react-map-gl/mapbox";
import Pin from "../../assets/images/pin.png";

function Markers({
  sourceLat,
  sourceLong,
  destLat,
  destLong,
}: {
  sourceLat: number;
  sourceLong: number;
  destLat: number | null;
  destLong: number | null;
}) {
  return (
    <div>
      {sourceLat !== null && sourceLong !== null && (
        <Marker longitude={sourceLong} latitude={sourceLat} anchor="bottom">
          <img src={Pin} className="w-10 h-10" />
        </Marker>
      )}
      {destLat !== null && destLong !== null && (
        <Marker longitude={destLong} latitude={destLat} anchor="bottom">
          <img src={Pin} className="w-10 h-10" />
        </Marker>
      )}
    </div>
  );
}

export default Markers;
