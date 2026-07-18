import type { Icon } from "@phosphor-icons/react";

export type Feature = {
  icon: string;
  title: string;
  description: string;
  color: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: Icon;
};

export type MoneyStep = {
  number: number;
  title: string;
  description: string;
  icon: Icon;
};

export type ContactItem = {
  title: string;
  value: string;
  icon: Icon;
};