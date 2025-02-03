import { NavigateFunction } from "react-router-dom";

export type sliceState = {
  userId: string | undefined;
  name: string | null | undefined;
  email: string | undefined | null;
  loadingSignup: boolean;
  error?: string | null;
};
export interface CredentialArgs {
  email: string;
  password: string;
  navigate: NavigateFunction;
}
