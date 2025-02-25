import Booking from "@/components/booking/booking";
import MapComponent from "@/components/map/MapComponent";
import Navbar from "@/components/navbar/Navbar";
import { getLocation } from "@/lib/features/maps/mapSlice";
import { addUser, removeUser } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { auth } from "@/utils/firebase";
import MetaDataProvider from "@/utils/MetaDataProvider";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName } = user;
        dispatch(addUser({ userId: uid, email: email, name: displayName }));

        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/registration");
      }
    });
  }, [dispatch, navigate]);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(function (pos) {
      dispatch(
        getLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      );
    });
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="">
          <Booking />
        </div>
        <div className="col-span-2 order-first md:order-last">
          <MapComponent />
        </div>
      </div>
      <MetaDataProvider
        title="CabEase Home"
        content="Your reliable ride, just a tap away"
      />
    </div>
  );
}

export default Home;
