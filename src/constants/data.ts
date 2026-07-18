import {
  ShoppingCart,
  House,
  Lightbulb,
  Car,
  FilmStrip,
  ForkKnife,
  Heart,
  ShieldCheck,
  PiggyBank,
  TShirt,
  User,
  DotsThreeOutline,
  CurrencyDollarSimple,
} from "@phosphor-icons/react";

import { colors } from "../theme/theme";

export const expenseCategories = {
  groceries: {
    label: "Groceries",
    value: "groceries",
    icon: ShoppingCart,
    bgColor: "#4b5563",
  },

  rent: {
    label: "Rent",
    value: "rent",
    icon: House,
    bgColor: "#075985",
  },

  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: Lightbulb,
    bgColor: "#ca8a04",
  },

  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: Car,
    bgColor: "#b45309",
  },

  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: FilmStrip,
    bgColor: "#0f766e",
  },

  dining: {
    label: "Dining",
    value: "dining",
    icon: ForkKnife,
    bgColor: "#be185d",
  },

  health: {
    label: "Health",
    value: "health",
    icon: Heart,
    bgColor: "#e11d48",
  },

  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: ShieldCheck,
    bgColor: "#404040",
  },

  savings: {
    label: "Savings",
    value: "savings",
    icon: PiggyBank,
    bgColor: "#065f46",
  },

  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: TShirt,
    bgColor: "#7c3aed",
  },

  personal: {
    label: "Personal",
    value: "personal",
    icon: User,
    bgColor: "#a21caf",
  },

  others: {
    label: "Others",
    value: "others",
    icon: DotsThreeOutline,
    bgColor: "#525252",
  },
};

export const incomeCategory = {
  label: "Income",
  value: "income",
  icon: CurrencyDollarSimple,
  bgColor: colors.green,
};

export const transactionTypes = [
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Income",
    value: "income",
  },
];