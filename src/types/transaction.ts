import type { Icon } from "@phosphor-icons/react";

export type TransactionKind = "income" | "expense";

export type TransactionCategory =
  | "Housing"
  | "Food & Dining"
  | "Groceries"
  | "Transportation"
  | "Shopping"
  | "Utilities"
  | "Personal"
  | "Income"
  | "Others";

export type Transaction = {
  id: number;
  title: string;
  description: string;
  category: TransactionCategory;
  wallet: string;
  type: TransactionKind;
  amount: number;
  date: string;
  receipt?: string;
  icon: Icon;
  color: string;
};

export type TransactionFilter = "all" | TransactionKind;