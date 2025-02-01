import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface TabWrapperProps {
  children: ReactNode;
  currentTab: string;
}
function TabWrapper({ children, currentTab }: TabWrapperProps) {
  return (
    <Tabs defaultValue={currentTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}

export default TabWrapper;
