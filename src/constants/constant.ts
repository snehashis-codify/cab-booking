import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { TabContentArrType } from "@/types/tabs";

export const tabContentArr: TabContentArrType = [
  {
    value: "signin",
    Content: LoginForm,
  },
  {
    value: "signup",
    Content: RegisterForm,
  },
];
