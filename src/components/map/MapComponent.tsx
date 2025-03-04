import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Map, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "../ui/skeleton";
import Markers from "./Markers";
import { useEffect, useRef } from "react";
import { getDirectionRoute } from "@/lib/features/maps/mapSlice";
import MapRoute from "./MapRoute";
import DistanceTime from "./DistanceTime";

function MapComponent() {
  const mapRef = useRef<MapRef>(null);
  const dispatch = useAppDispatch();
  const {
    sourceCords,
    destinationCords,
    coordinates,
    distance,
    duration,
    loadingRouteDirection,
  } = useAppSelector((state) => state.map);
  const { latitude: sourceLat, longitude: sourceLong } = sourceCords;
  const { latitude: destLat, longitude: destLong } = destinationCords;

  // Use to fly source marker location
  useEffect(() => {
    if (sourceLat !== null && sourceLong !== null) {
      mapRef.current?.flyTo({
        center: [sourceLong, sourceLat],
        duration: 2500,
      });
    }
  }, [sourceLat, sourceLong]);

  // Use to fly destination marker location
  useEffect(() => {
    if (destLat !== null && destLong !== null) {
      mapRef.current?.flyTo({
        center: [destLong, destLat],
        duration: 2500,
      });
    }
  }, [destLat, destLong]);
  useEffect(() => {
    if (
      sourceLat !== null &&
      sourceLong !== null &&
      destLat !== null &&
      destLong !== null
    ) {
      dispatch(getDirectionRoute({ sourceLat, sourceLong, destLat, destLong }));
    }
  }, [sourceLat, sourceLong, destLat, destLong, dispatch]);
  console.log("jk", coordinates);
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {sourceLat !== null && sourceLong !== null ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: sourceLong,
              latitude: sourceLat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers
              sourceLat={sourceLat}
              sourceLong={sourceLong}
              destLat={destLat}
              destLong={destLong}
            />
            {coordinates.length > 0 ? (
              <MapRoute coordinates={coordinates} />
            ) : null}
          </Map>
        ) : (
          <Skeleton className="w-full h-[450px] rounded-lg" />
        )}
      </div>
      {!loadingRouteDirection && distance > 0 && (
        <div className="absolute bottom-[180px] z-20 right-[25px] hidden md:block">
          <DistanceTime distance={distance} duration={duration} />
        </div>
      )}
    </div>
  );
}

export default MapComponent;
