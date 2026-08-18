import type { Icon } from "@phosphor-icons/react";

export type TimePeriod = "weekly" | "monthly" | "yearly";

export type TransactionType = "Income" | "Expense";

export type Transaction = {
  id?: string;
  uid?:string;
  walletId?: string;
  date?: Date | undefined | null;
  description?: string;
  category?: string | undefined | null;
  type?: TransactionType;
  amount?: number;
  image?: string | null;
};

export type ExpenseCategory = {
  name?: string;
  amount?: number;
  percentage: number;
  color: string;
};

export type WalletType = {
  id: number | string;
  uid?:string;
  name: string;
  amount: number;
  type?: "Primary Wallet" | "Secondary Wallet";
  color?: string;
  icon?: Icon;
  totalIncome?: number;
  totalExpense?: number;
  image?: string | null;
};

export type FinanceContextType = {
  transactions: Transaction[];
  wallets: WalletType[];
  loading: boolean;
  error: string;
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};