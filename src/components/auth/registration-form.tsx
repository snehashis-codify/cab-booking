import CardWrapper from "@/components/auth/card-wrapper";
import TabWrapper from "@/components/auth/tab-wrapper";
import { tabContentArr } from "@/constants/constant";
import { TabsContent } from "@/components/ui/tabs";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/utils/firebase";
// import { useAppDispatch } from "@/lib/hooks";
// import { addUser, removeUser } from "@/lib/features/users/userSlice";

function RegistrationForm() {
  //   const navigate = useNavigate();
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         const { uid, displayName, email } = user;
  //         dispatch(addUser({ userId: uid, name: displayName, email: email }));
  //         router.push("/");
  //       } else {
  //         dispatch(removeUser());
  //         router.push("/registration");
  //       }
  //     });
  //   }, []);
  return (
    <CardWrapper headerLabel="Your reliable ride, just a tap away" showSocial>
      <TabWrapper currentTab="signin">
        {tabContentArr.map((TabData) => (
          <TabsContent value={TabData.value} key={TabData.value}>
            <TabData.Content />
          </TabsContent>
        ))}
      </TabWrapper>
    </CardWrapper>
  );
}

export default RegistrationForm;
