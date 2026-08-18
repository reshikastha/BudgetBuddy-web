import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

export type UserType = {
  uid: string;
  email: string | null;
  name: string | null;
  image: string | null;
  phone?: string | null;
  location?: string | null;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
};

export type AuthContextType = {
  user: UserType | null;
  loading: boolean;

  setUser: Dispatch<SetStateAction<UserType | null>>;

  login: (
    email: string,
    password: string,
  ) => Promise<AuthResponse>;

  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<AuthResponse>;

  logout: () => Promise<AuthResponse>;
  updateUserData: (uid: string) => Promise<void>;
};

export type AuthProviderProps = {
  children: ReactNode;
};