import { useAppSelector } from "@/lib/hooks";
import { Map, Marker } from "react-map-gl/mapbox";
import Pin from "../../assets/images/pin.png";
import "mapbox-gl/dist/mapbox-gl.css";

function MapComponent() {
  const { latitude, longitude } = useAppSelector((state) => state.map);
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {latitude !== null && longitude !== null ? (
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={longitude} latitude={latitude} anchor="bottom">
              <img src={Pin} className="w-10 h-10" />
            </Marker>
          </Map>
        ) : null}
      </div>
    </div>
  );
}

export default MapComponent;
