import type { Icon } from "@phosphor-icons/react";

export type UserProfile = {
  uid?: string,
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
};

export type ProfileOption = {
  title: string;
  description: string;
  route: string;
  icon: Icon;
  color: string;
};


export type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
};