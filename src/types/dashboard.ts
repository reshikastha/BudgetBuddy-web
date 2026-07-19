import type { Icon } from "@phosphor-icons/react";

export type SidebarItem = {
  label: string;
  icon: Icon;
  active?: boolean;
  link: string;
};

export type Transaction = {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  icon: Icon;
  color: string;
};

export type ExpenseCategory = {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: Icon;
};

export type OverviewItem = {
  label: string;
  amount: number;
  color: string;
};