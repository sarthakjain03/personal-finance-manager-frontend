import { User } from "./user";

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserAuthenticating: boolean;
  setIsUserAuthenticating: (isUserAuthenticating: boolean) => void;
  openSignInModal: boolean;
  setOpenSignInModal: (openSignInModal: boolean) => void;
}
