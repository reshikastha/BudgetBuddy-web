// import type { Timestamp } from "firebase/firestore";
import type { Icon } from "@phosphor-icons/react";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
  SVGProps,
  ComponentType,
} from "react";

/* ---------- Common types ---------- */

export type ImageValue = string | File | null;

export type ScreenWrapperProps = {
  style?: CSSProperties;
  children: ReactNode;
};

export type ModalWrapperProps = {
  style?: CSSProperties;
  children: ReactNode;
  bg?: string;
};

export type AccountOptionType = {
  title: string;
  icon: ReactNode;
  bgColor: string;
  routeName?: string;
};

// Landing page 


/* ---------- Typography ---------- */

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: CSSProperties["fontWeight"];
  children?: ReactNode;
  style?: CSSProperties;
  textAlign?: CSSProperties["textAlign"];
  textProps?: HTMLAttributes<HTMLParagraphElement>;
};

/* ---------- Icons ---------- */

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type AppIconProps = {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
};

/* ---------- Header ---------- */

export type HeaderProps = {
  title?: string;
  style?: CSSProperties;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type BackButtonProps = {
  style?: CSSProperties;
  iconSize?: number;
};

/* ---------- Transactions ---------- */

export type TransactionKind = "expense" | "income";

export type TransactionType = {
  id?: string;
  type: TransactionKind;
  amount: number;
  category?: string;
  date: Date | string;
  description?: string;
  image?: ImageValue;
  uid?: string;
  walletId: string;
};

export type CategoryType = {
  label: string;
  value: string;
  icon: Icon;
  bgColor: string;
};

export type ExpenseCategoriesType = Record<string, CategoryType>;

export type TransactionListType = {
  data: TransactionType[];
  title?: string;
  loading?: boolean;
  emptyListMessage?: string;
};

export type TransactionItemProps = {
  item: TransactionType;
  index: number;
  handleClick: (item: TransactionType, index: number) => void;
};

/* ---------- Input ---------- */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  icon?: ReactNode;
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  inputRef?: RefObject<HTMLInputElement | null>;
  label?: string;
  error?: string;
}

/* ---------- Button ---------- */

export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

/* ---------- Image upload ---------- */

export type ImageUploadProps = {
  file?: File | null;
  onSelect: (file: File) => void;
  onClear: () => void;
  containerStyle?: CSSProperties;
  imageStyle?: CSSProperties;
  placeholder?: string;
};

/* ---------- User and authentication ---------- */

export type UserType =
  | {
      uid?: string;
      email?: string | null;
      name: string | null;
      image?: ImageValue;
    }
  | null;

export type UserDataType = {
  name: string;
  image?: ImageValue;
};

export type AuthResponse = {
  success: boolean;
  msg?: string;
};

export type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;

  login: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;

  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResponse>;

  updateUserData: (userId: string) => Promise<void>;
};

/* ---------- API response ---------- */

export type ResponseType<T = unknown> = {
  success: boolean;
  data?: T;
  msg?: string;
};

/* ---------- Wallet ---------- */

export type WalletType = {
  id?: string;
  name: string;
  amount?: number;
  totalIncome?: number;
  totalExpenses?: number;
  image?: ImageValue;
  uid?: string;
  created?: Date;
};