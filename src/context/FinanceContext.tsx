// src/context/FinanceContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import { firestore } from "../config/firebase";
import { useAuth } from "./AuthContext";

import type {
  FinanceContextType,
  Transaction,
  TransactionType,
  WalletType,
} from "../types/finance";

const FinanceContext =
  createContext<FinanceContextType | null>(null);

type FinanceProviderProps = {
  children: ReactNode;
};

function convertToDate(value: unknown): Date {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    const convertedDate = new Date(value);

    if (!Number.isNaN(convertedDate.getTime())) {
      return convertedDate;
    }
  }

  return new Date(0);
}

export function FinanceProvider({
  children,
}: FinanceProviderProps) {
  const { user, loading: authLoading } = useAuth();

  const [transactions, setTransactions] = useState<
    Transaction[]
  >([]);

  const [wallets, setWallets] = useState<WalletType[]>([]);

  const [transactionsLoading, setTransactionsLoading] =
    useState<boolean>(true);

  const [walletsLoading, setWalletsLoading] =
    useState<boolean>(true);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user?.uid) {
      setTransactions([]);
      setWallets([]);
      setTransactionsLoading(false);
      setWalletsLoading(false);
      return;
    }

    setTransactionsLoading(true);
    setWalletsLoading(true);
    setError("");

    const transactionsQuery = query(
      collection(firestore, "transactions"),
      where("uid", "==", user.uid),
    );

    const walletsQuery = query(
      collection(firestore, "wallets"),
      where("uid", "==", user.uid),
    );

    const unsubscribeTransactions = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        const retrievedTransactions: Transaction[] =
          snapshot.docs.map((transactionDocument) => {
            const data = transactionDocument.data();

            return {
              id: transactionDocument.id,
              uid:
                typeof data.uid === "string"
                  ? data.uid
                  : "",
              walletId:
                typeof data.walletId === "string"
                  ? data.walletId
                  : "",
              amount: Number(data.amount) || 0,
              category:
                typeof data.category === "string"
                  ? data.category
                  : "others",
              description:
                typeof data.description === "string"
                  ? data.description
                  : "",
              type:
                data.type === "Income"
                  ? "Income"
                  : ("Expense" as TransactionType),
              date: convertToDate(data?.date),
              image:
                typeof data.image === "string"
                  ? data.image
                  : null,
            };
          });

        retrievedTransactions.sort(
         (firstTransaction, secondTransaction) => {
            const firstDate =
            firstTransaction.date?.getTime() ?? 0;

            const secondDate =
            secondTransaction.date?.getTime() ?? 0;

            return secondDate - firstDate;
  },
        );

        setTransactions(retrievedTransactions);
        setTransactionsLoading(false);
      },
      (firebaseError) => {
        console.error(
          "Unable to retrieve transactions:",
          firebaseError,
        );

        setError("Unable to retrieve transactions.");
        setTransactionsLoading(false);
      },
    );

    const unsubscribeWallets = onSnapshot(
      walletsQuery,
      (snapshot) => {
        const retrievedWallets: WalletType[] =
          snapshot.docs.map((walletDocument) => {
            const data = walletDocument.data();

            return {
              id: walletDocument.id,
              uid:
                typeof data.uid === "string"
                  ? data.uid
                  : "",
              name:
                typeof data.name === "string"
                  ? data.name
                  : "Wallet",
              amount: Number(data?.amount) || 0,
              totalIncome:
                Number(data.totalIncome) || 0,
              totalExpense:
                Number(
                  data.totalExpense ??
                    data.totalExpenses,
                ) || 0,
              image:
                typeof data.image === "string" &&
                data.image.startsWith("https://")
                  ? data.image
                  : null,
            };
          });

        setWallets(retrievedWallets);
        setWalletsLoading(false);
      },
      (firebaseError) => {
        console.error(
          "Unable to retrieve wallets:",
          firebaseError,
        );

        setError("Unable to retrieve wallets.");
        setWalletsLoading(false);
      },
    );

    return () => {
      unsubscribeTransactions();
      unsubscribeWallets();
    };
  }, [user?.uid, authLoading]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction?.type === "Income")
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount ?? 0),
        0,
      );
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "Expense")
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount ?? 0),
        0,
      );
  }, [transactions]);

  const transactionBalance = totalIncome - totalExpenses;

  const walletBalance = useMemo(() => {
    return wallets.reduce(
      (total, wallet) => total + wallet.amount,
      0,
    );
  }, [wallets]);

  const totalBalance =
    wallets.length > 0 ? walletBalance : transactionBalance;

  const contextValue = useMemo<FinanceContextType>(
    () => ({
      transactions,
      wallets,
      loading:
        authLoading ||
        transactionsLoading ||
        walletsLoading,
      error,
      totalIncome,
      totalExpenses,
      totalBalance,
    }),
    [
      transactions,
      wallets,
      authLoading,
      transactionsLoading,
      walletsLoading,
      error,
      totalIncome,
      totalExpenses,
      totalBalance,
    ],
  );

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance must be used inside FinanceProvider.",
    );
  }

  return context;
}