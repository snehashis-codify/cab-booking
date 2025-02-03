import { Button } from "@/components/ui/button";
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
  return (
    <div>
      Home
      <Button>Sign out</Button>
      <MetaDataProvider
        title="CabEase Home"
        content="Your reliable ride, just a tap away"
      />
    </div>
  );
}

export default Home;
