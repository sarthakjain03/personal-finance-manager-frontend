import { User } from './user';

export interface UserStore {
    user: User | null;
    setUser: (user: User | null | undefined) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isUserAuthenticating: boolean;
    setIsUserAuthenticating: (isUserAuthenticating: boolean) => void;
}