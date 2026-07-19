import type { Icon } from "@phosphor-icons/react";

export type TimePeriod = "weekly" | "monthly" | "yearly";

export type TransactionType = "Income" | "Expense";

export type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
};

export type ExpenseCategory = {
  name: string;
  amount: number;
  percentage: number;
  color: string;
};

export type WalletType = {
  id: number;
  name: string;
  amount: number;
  type: "Primary Wallet" | "Secondary Wallet";
  color: string;
  icon: Icon;
};