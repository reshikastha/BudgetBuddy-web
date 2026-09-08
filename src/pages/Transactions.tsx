
// src/pages/Transactions.tsx

import {
  ArrowDown,
  ArrowUp,
  ForkKnife,
  House,
  ImageSquare,
  MagnifyingGlass,
  Money,
  PencilSimple,
  Plus,
  Receipt,
  ShoppingCart,
  Trash,
  TrendDown,
  TrendUp,
  Wallet as WalletIcon,
} from "@phosphor-icons/react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteDoc, doc } from "firebase/firestore";

import SidebarNav from "../components/SidebarNav";
import { useFinance } from "../context/FinanceContext";
import { firestore } from "../config/firebase";

import "../styles/Transactions.css";

type TransactionFilter = "all" | "Income" | "expense";

const categoryColours: Record<string, string> = {
  groceries: "#64748b",
  rent: "#0ea5e9",
  housing: "#0ea5e9",
  home: "#0ea5e9",
  utilities: "#ca8a04",
  transportation: "#b45309",
  transport: "#b45309",
  entertainment: "#0f766e",
  dining: "#f59e0b",
  "food & dining": "#f59e0b",
  health: "#e11d48",
  insurance: "#404040",
  savings: "#065f46",
  clothing: "#7c3aed",
  personal: "#a21caf",
  income: "#22c55e",
  others: "#525252",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatCategory(category: string): string {
  if (!category) {
    return "Others";
  }

  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function convertTransactionDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  // Firebase Timestamp
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    const convertedDate = value.toDate();

    return convertedDate instanceof Date
      ? convertedDate
      : null;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    const convertedDate = new Date(value);

    return Number.isNaN(convertedDate.getTime())
      ? null
      : convertedDate;
  }

  return null;
}

function formatTransactionDate(value: unknown): string {
  const date = convertTransactionDate(value);

  if (!date) {
    return "No date";
  }

  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTransactionIcon(
  category: string,
  type: string,
) {
  if (type === "income") {
    return Money;
  }

  switch (category) {
    case "rent":
    case "housing":
    case "home":
      return House;

    case "groceries":
      return ShoppingCart;

    case "dining":
    case "food & dining":
      return ForkKnife;

    default:
      return WalletIcon;
  }
}

function Transactions() {
  const navigate = useNavigate();

  const {
    transactions,
    wallets,
    totalIncome,
    totalExpenses,
    totalBalance,
    loading,
    error: financeError,
  } = useFinance();

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] =
    useState<TransactionFilter>("all");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [pageError, setPageError] = useState<string>("");

  /*
   * Create a wallet ID -> wallet name lookup.
   */
  const walletNames = useMemo(() => {
    const walletLookup: Record<string, string> = {};

    wallets.forEach((wallet) => {
      walletLookup[wallet.id] = wallet.name;
    });

    return walletLookup;
  }, [wallets]);

  const filteredTransactions = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const transactionType =
        transaction.type?.toLowerCase() || "expense";

      const category =
        transaction.category?.toLowerCase() || "others";

      const description =
        transaction.description?.toLowerCase() || "";

     const walletId = transaction.walletId ?? "";

    const walletName = walletId
      ? walletNames[walletId] ?? "Unknown Wallet"
      : "Unknown Wallet";

      const matchesFilter =
        filter === "all" || transactionType === filter;

      const matchesSearch =
        !searchText ||
        description.includes(searchText) ||
        category.includes(searchText) ||
        walletName.includes(searchText) ||
        transactionType.includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [transactions, walletNames, search, filter]);

  async function deleteTransaction(
    transactionId: string,
  ): Promise<void> {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(transactionId);
      setPageError("");

      await deleteDoc(
        doc(firestore, "transactions", transactionId),
      );

      /*
       * No local setTransactions is required.
       * FinanceContext onSnapshot updates automatically.
       */
    } catch (deleteError) {
      console.error(
        "Unable to delete transaction:",
        deleteError,
      );

      setPageError(
        "Unable to delete the transaction. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function viewReceipt(receiptUrl: string): void {
    if (
      !receiptUrl.startsWith("https://") &&
      !receiptUrl.startsWith("http://")
    ) {
      setPageError(
        "This receipt uses an old local file path and cannot be opened on the web.",
      );

      return;
    }

    window.open(
      receiptUrl,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (loading) {
    return (
      <div className="transactions-layout">
        <SidebarNav />

        <main className="transactions-page">
          <p className="transactions-loading">
            Loading transactions...
          </p>
        </main>
      </div>
    );
  }

  
  return (
    <div className="transactions-layout">
      <SidebarNav />

      <main className="transactions-page">
        <header className="transactions-header">
          <div>
            <h1>Transactions</h1>

            <p>
              View and manage all your income and expenses.
            </p>
          </div>

          <button
            type="button"
            className="new-transaction-button"
            onClick={() => navigate("/newTransaction")}
          >
            <Plus size={18} weight="bold" />
            New Transaction
          </button>
        </header>

        {(financeError || pageError) && (
          <p className="transactions-error-message">
            {pageError || financeError}
          </p>
        )}

        <section className="transaction-summary">
          <article className="summary-card">
            <div className="summary-icon balance-icon">
              <WalletIcon size={23} weight="duotone" />
            </div>

            <div>
              <span>Net Balance</span>

              <strong>
                {formatCurrency(totalBalance)}
              </strong>

              <small className="positive-change">
                <TrendUp size={14} weight="bold" />
                Live balance
              </small>
            </div>
          </article>

          <article className="summary-card">
            <div className="summary-icon income-icon">
              <ArrowDown size={23} weight="bold" />
            </div>

            <div>
              <span>Total Income</span>

              <strong>
                {formatCurrency(totalIncome)}
              </strong>

              <small className="positive-change">
                <TrendUp size={14} weight="bold" />
                From Firebase
              </small>
            </div>
          </article>

          <article className="summary-card">
            <div className="summary-icon expense-icon">
              <ArrowUp size={23} weight="bold" />
            </div>

            <div>
              <span>Total Expenses</span>

              <strong>
                {formatCurrency(totalExpenses)}
              </strong>

              <small className="negative-change">
                <TrendDown size={14} weight="bold" />
                From Firebase
              </small>
            </div>
          </article>
        </section>

        <section className="transaction-toolbar">
          <label className="transaction-search">
            <MagnifyingGlass size={18} />

            <input
              type="search"
              placeholder="Search transactions..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </label>

          <div className="transaction-filters">
            <div className="type-filter">
              {(
                [
                  "all",
                  "income",
                  "expense",
                ] as TransactionFilter[]
              ).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    filter === item
                      ? "active-filter"
                      : ""
                  }
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="transactions-card">
          <div className="transactions-card-header">
            <div>
              <h2>Transaction History</h2>

              <p>
                {filteredTransactions.length} transaction
                {filteredTransactions.length === 1
                  ? ""
                  : "s"}{" "}
                found
              </p>
            </div>

            <Receipt size={24} weight="duotone" />
          </div>

          <div className="desktop-transaction-table">
            <div className="transaction-table-heading">
              <span>Transaction</span>
              <span>Category</span>
              <span>Wallet</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Receipt</span>
              <span>Actions</span>
            </div>

            <div className="transaction-rows">
              {filteredTransactions.map(
                (transaction) => {
                  const transactionType =
                    transaction.type?.toLowerCase() ||
                    "expense";

                  const category =
                    transaction.category
                      ?.trim()
                      .toLowerCase() || "others";

                  const formattedCategory =
                    formatCategory(category);

                  const walletId = transaction.walletId ?? "";

                  const walletName = walletId
                    ? walletNames[walletId] ?? "Unknown Wallet"
                    : "Unknown Wallet";

                  const isExpense =
                    transactionType === "expense";

                  const amount = Number(
                    transaction.amount ?? 0,
                  );

                
                  const receipt =
                    typeof transaction.image === "string"
                      ? transaction.image
                      : "";

                  const title =
                    transaction.description?.trim() ||
                    formattedCategory;

                  const TransactionIcon =
                    getTransactionIcon(
                      category,
                      transactionType,
                    );

                  const iconColour =
                    isExpense
                      ? categoryColours.expense
                      : categoryColours[category] ??
                        categoryColours.others;
            const transactionId =
              transaction.id !== undefined &&
              transaction.id !== null
                ? String(transaction.id)
                : "";
                  return (
                    <article
                      className="transaction-row"
                      key={transaction.id}
                    >
                      <div className="transaction-name-cell">
                        <div
                          className="transaction-list-icon"
                          style={{
                            backgroundColor: iconColour,
                          }}
                        >
                          <TransactionIcon
                            size={20}
                            weight="fill"
                          />
                        </div>

                        <div>
                          <strong>{title}</strong>

                          <span>
                            {isExpense
                              ? `${formattedCategory} expense` 
                              : "Income transaction"}
                          </span>
                        </div>
                      </div>

                      <span className="category-label">
                        {isExpense
                          ? formattedCategory
                          : "Income" }
                      </span>

                      <span className="wallet-name">
                        {walletName}
                      </span>

                      <span className="transaction-date">
                        {formatTransactionDate(
                          transaction.date,
                        )}
                      </span>

                      <strong
                        className={
                          isExpense
                            ?  "expense-amount"
                            : "income-amount"
                        }
                      >
                        {isExpense ? "-" : "+"}
                        {formatCurrency(amount)}
                      </strong>

                      <div className="receipt-cell">
                        {receipt ? (
                          <button
                            type="button"
                            className="receipt-button"
                            onClick={() =>
                              viewReceipt(receipt)
                            }
                            aria-label={`View receipt for ${title}`}
                          >
                            <ImageSquare size={19} />
                            View
                          </button>
                        ) : (
                          <span>No receipt</span>
                        )}
                      </div>

                      <div className="transaction-actions">
                        <button
                          type="button"
                          className="edit-transaction"
                          onClick={() =>
                            navigate(
                              `/editTransaction/${transaction.id}`,
                            )
                          }
                          aria-label={`Edit ${title}`}
                        >
                          <PencilSimple size={17} />
                        </button>

                        <button
                          type="button"
                          className="delete-transaction"
                          disabled={
                            deletingId === transaction.id
                          }
                          onClick={() =>
                            deleteTransaction(transactionId
                            )
                          }
                          aria-label={`Delete ${title}`}
                        >
                          <Trash size={17} />
                        </button>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </div>

          <div className="mobile-transaction-list">
            {filteredTransactions.map(
              (transaction) => {
                const transactionType =
                  transaction.type?.toLowerCase() ||
                  "expense";

                const category =
                  transaction.category
                    ?.trim()
                    .toLowerCase() || "others";

                const formattedCategory =
                  formatCategory(category);

                const isIncome =
                  transactionType === "Income";

                const amount = Number(
                  transaction.amount ?? 0,
                );

               const walletId = transaction.walletId ?? "";

                const walletName = walletId
                  ? walletNames[walletId] ?? "Unknown Wallet"
                  : "Unknown Wallet";
                const receipt =
                  typeof transaction.image === "string"
                    ? transaction.image
                    : "";

                const title =
                  transaction.description?.trim() ||
                  formattedCategory;

                const TransactionIcon =
                  getTransactionIcon(
                    category,
                    transactionType,
                  );

                const iconColour =
                  isIncome
                    ? categoryColours.income
                    : categoryColours[category] ??
                      categoryColours.others;
                      
                const transactionId =
                  transaction.id !== undefined &&
                  transaction.id !== null
                    ? String(transaction.id)
                    : "";

                return (
                  <article
                    className="mobile-transaction-card"
                    key={transaction.id}
                  >
                    <div className="mobile-transaction-top">
                      <div
                        className="transaction-list-icon"
                        style={{
                          backgroundColor: iconColour,
                        }}
                      >
                        <TransactionIcon
                          size={20}
                          weight="fill"
                        />
                      </div>

                      <div className="mobile-transaction-title">
                        <strong>{title}</strong>
                        <span>{formattedCategory}</span>
                      </div>

                      <strong
                        className={
                          isIncome
                            ? "income-amount"
                            : "expense-amount"
                        }
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(amount)}
                      </strong>
                    </div>

                    <div className="mobile-transaction-details">
                      <span>{formattedCategory}</span>
                      <span>{walletName}</span>

                      <span>
                        {formatTransactionDate(
                          transaction.date,
                        )}
                      </span>
                    </div>

                    <div className="mobile-transaction-actions">
                      {receipt && (
                        <button
                          type="button"
                          className="receipt-button"
                          onClick={() =>
                            viewReceipt(receipt)
                          }
                        >
                          <ImageSquare size={17} />
                          Receipt
                        </button>
                      )}

                      <button
                        type="button"
                        className="edit-transaction"
                        onClick={() =>
                          navigate(
                            `/editTransaction/${transaction.id}`,
                          )
                        }
                      >
                        <PencilSimple size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-transaction"
                        disabled={
                          deletingId === transaction.id
                        }
                        onClick={() =>
                          deleteTransaction(transactionId)}
                      >
                        <Trash size={17} />
                        {deletingId === transaction.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </article>
                );
              },
            )}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="empty-transactions">
              <Receipt size={45} weight="duotone" />

              <h3>No transactions found</h3>

              <p>
                Try changing your search or filter.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Transactions;
