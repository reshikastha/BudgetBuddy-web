import {
  ArrowDown,
  ArrowUp,
  CalendarBlank,
  CaretDown,
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
  Wallet,
} from "@phosphor-icons/react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  Transaction,
  TransactionFilter,
} from "../types/transaction";

import "../styles/Transactions.css";
import SidebarNav from "../components/SidebarNav";

const transactionData: Transaction[] = [
  {
    id: 1,
    title: "Monthly Rent",
    description: "October apartment rent",
    category: "Housing",
    wallet: "Salary Wallet",
    type: "expense",
    amount: 480,
    date: "5 Oct 2026",
    receipt: "/images/rent-receipt.jpg",
    icon: House,
    color: "#0ea5e9",
  },
  {
    id: 2,
    title: "September Salary",
    description: "Monthly salary payment",
    category: "Income",
    wallet: "Salary Wallet",
    type: "income",
    amount: 3010,
    date: "5 Oct 2026",
    icon: Money,
    color: "#22c55e",
  },
  {
    id: 3,
    title: "Grocery Shopping",
    description: "Weekly groceries",
    category: "Groceries",
    wallet: "Salary Wallet",
    type: "expense",
    amount: 50,
    date: "4 Oct 2026",
    receipt: "/images/grocery-receipt.jpg",
    icon: ShoppingCart,
    color: "#64748b",
  },
  {
    id: 4,
    title: "Dinner",
    description: "Dinner with friends",
    category: "Food & Dining",
    wallet: "Side Hustle",
    type: "expense",
    amount: 120,
    date: "3 Oct 2026",
    icon: ForkKnife,
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Freelance Project",
    description: "Website development",
    category: "Income",
    wallet: "Side Hustle",
    type: "income",
    amount: 950,
    date: "2 Oct 2026",
    icon: Wallet,
    color: "#8b5cf6",
  },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
}

function Transactions() {
  const navigate = useNavigate();

  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionData);

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("October 2026");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesFilter =
        filter === "all" || transaction.type === filter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.title.toLowerCase().includes(searchText) ||
        transaction.category.toLowerCase().includes(searchText) ||
        transaction.wallet.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [transactions, filter, search]);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  function deleteTransaction(id: number): void {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) {
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== id,
      ),
    );
  }

  return (

    <div className="transactions-layout">

    <SidebarNav/>
    <main className="transactions-page">
      <header className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>View and manage all your income and expenses.</p>
        </div>

        <button
          className="new-transaction-button"
          onClick={() => navigate("/newTransaction")}
        >
          <Plus size={18} weight="bold" />
          New Transaction
        </button>
      </header>

      {/* Summary cards */}

      <section className="transaction-summary">
        <article className="summary-card">
          <div className="summary-icon balance-icon">
            <Wallet size={23} weight="duotone" />
          </div>

          <div>
            <span>Net Balance</span>
            <strong>{formatCurrency(netBalance)}</strong>

            <small className="positive-change">
              <TrendUp size={14} weight="bold" />
              12.5% this month
            </small>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon income-icon">
            <ArrowDown size={23} weight="bold" />
          </div>

          <div>
            <span>Total Income</span>
            <strong>{formatCurrency(totalIncome)}</strong>

            <small className="positive-change">
              <TrendUp size={14} weight="bold" />
              8.2% this month
            </small>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon expense-icon">
            <ArrowUp size={23} weight="bold" />
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>{formatCurrency(totalExpenses)}</strong>

            <small className="negative-change">
              <TrendDown size={14} weight="bold" />
              3.1% this month
            </small>
          </div>
        </article>
      </section>

      {/* Filters */}

      <section className="transaction-toolbar">
        <label className="transaction-search">
          <MagnifyingGlass size={18} />

          <input
            type="search"
            placeholder="Search transactions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <div className="transaction-filters">
          <div className="type-filter">
            {(
              ["all", "income", "expense"] as TransactionFilter[]
            ).map((item) => (
              <button
                key={item}
                className={filter === item ? "active-filter" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

         
        </div>
      </section>

      {/* Transaction list */}

      <section className="transactions-card">
        <div className="transactions-card-header">
          <div>
            <h2>Transaction History</h2>

            <p>
              {filteredTransactions.length} transaction
              {filteredTransactions.length === 1 ? "" : "s"} found
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
            {filteredTransactions.map((transaction) => {
              const TransactionIcon = transaction.icon;

              return (
                <article
                  className="transaction-row"
                  key={transaction.id}
                >
                  <div className="transaction-name-cell">
                    <div
                      className="transaction-list-icon"
                      style={{
                        backgroundColor: transaction.color,
                      }}
                    >
                      <TransactionIcon size={20} weight="fill" />
                    </div>

                    <div>
                      <strong>{transaction.title}</strong>
                      <span>{transaction.description}</span>
                    </div>
                  </div>

                  <span className="category-label">
                    {transaction.category}
                  </span>

                  <span className="wallet-name">
                    {transaction.wallet}
                  </span>

                  <span className="transaction-date">
                    {transaction.date}
                  </span>

                  <strong
                    className={
                      transaction.type === "income"
                        ? "income-amount"
                        : "expense-amount"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </strong>

                  <div className="receipt-cell">
                    {transaction.receipt ? (
                      <button
                        className="receipt-button"
                        aria-label={`View receipt for ${transaction.title}`}
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
                      className="edit-transaction"
                      aria-label={`Edit ${transaction.title}`}
                    >
                      <PencilSimple size={17} />
                    </button>

                    <button
                      className="delete-transaction"
                      onClick={() =>
                        deleteTransaction(transaction.id)
                      }
                      aria-label={`Delete ${transaction.title}`}
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile cards */}

        <div className="mobile-transaction-list">
          {filteredTransactions.map((transaction) => {
            const TransactionIcon = transaction.icon;

            return (
              <article
                className="mobile-transaction-card"
                key={transaction.id}
              >
                <div className="mobile-transaction-top">
                  <div
                    className="transaction-list-icon"
                    style={{
                      backgroundColor: transaction.color,
                    }}
                  >
                    <TransactionIcon size={20} weight="fill" />
                  </div>

                  <div className="mobile-transaction-title">
                    <strong>{transaction.title}</strong>
                    <span>{transaction.description}</span>
                  </div>

                  <strong
                    className={
                      transaction.type === "income"
                        ? "income-amount"
                        : "expense-amount"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </strong>
                </div>

                <div className="mobile-transaction-details">
                  <span>{transaction.category}</span>
                  <span>{transaction.wallet}</span>
                  <span>{transaction.date}</span>
                </div>

                <div className="mobile-transaction-actions">
                  {transaction.receipt && (
                    <button className="receipt-button">
                      <ImageSquare size={17} />
                      Receipt
                    </button>
                  )}

                  <button className="edit-transaction">
                    <PencilSimple size={17} />
                    Edit
                  </button>

                  <button
                    className="delete-transaction"
                    onClick={() =>
                      deleteTransaction(transaction.id)
                    }
                  >
                    <Trash size={17} />
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="empty-transactions">
            <Receipt size={45} weight="duotone" />

            <h3>No transactions found</h3>

            <p>Try changing your search or filter.</p>
          </div>
        )}
      </section>
    </main>
    </div>
  );
}

export default Transactions;