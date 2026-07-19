import {
  Bell,
  Car,
  ChartBar,
  DotsThree,
  ForkKnife,
  Gear,

  Handbag,
  House,
  List,
  MagnifyingGlass,
  Money,
  PiggyBank,
  Plus,
  Receipt,
  SignOut,
  ShoppingCart,
  SquaresFour,
  TrendDown,
  TrendUp,
  User,
  Wallet,
  X,
} from "@phosphor-icons/react";

import { useState } from "react";

import type {
  ExpenseCategory,
  OverviewItem,
  SidebarItem,
  Transaction,
} from "../types/dashboard";

import "../styles/dashboard.css";
import SidebarNav from "../components/SidebarNav";
import { useNavigate } from "react-router-dom";

const transactions: Transaction[] = [
  {
    id: 1,
    title: "Rent",
    description: "Housing",
    amount: 480,
    date: "5 Oct",
    type: "expense",
    icon: House,
    color: "#0ea5e9",
  },
  {
    id: 2,
    title: "Personal",
    description: "Sushi",
    amount: 20,
    date: "5 Oct",
    type: "expense",
    icon: User,
    color: "#c026d3",
  },
  {
    id: 3,
    title: "Groceries",
    description: "Some meat",
    amount: 50,
    date: "5 Oct",
    type: "expense",
    icon: ShoppingCart,
    color: "#64748b",
  },
  {
    id: 4,
    title: "Income",
    description: "September salary",
    amount: 2000,
    date: "5 Oct",
    type: "income",
    icon: Money,
    color: "#22c55e",
  },
];

const expenseCategories: ExpenseCategory[] = [
  {
    name: "Housing",
    amount: 480,
    percentage: 45,
    color: "#ef4444",
    icon: House,
  },
  {
    name: "Food & Dining",
    amount: 120,
    percentage: 22,
    color: "#f59e0b",
    icon: ForkKnife,
  },
  {
    name: "Transport",
    amount: 80,
    percentage: 15,
    color: "#ef4444",
    icon: Car,
  },
  {
    name: "Shopping",
    amount: 50,
    percentage: 9,
    color: "#8b5cf6",
    icon: Handbag,
  },
  {
    name: "Others",
    amount: 30,
    percentage: 9,
    color: "#8b5cf6",
    icon: DotsThree,
  },
];

const overviewItems: OverviewItem[] = [
  {
    label: "Income",
    amount: 3010,
    color: "#38bdf8",
  },
  {
    label: "Expenses",
    amount: 530,
    color: "#ef4444",
  },
  {
    label: "Savings",
    amount: 2480,
    color: "#84cc16",
  },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
}

function Dashboard() {
    const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="dashboard-layout">
      
      <SidebarNav/>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <List size={24} />
          </button>

          <div className="welcome-message">
            <span>Hello,</span>

            <h1>
              Reshika <span>👋</span>
            </h1>
          </div>

          <div className="header-controls">
            <label className="search-field">
              <input
                type="search"
                placeholder="Search anything..."
                aria-label="Search"
              />

              <MagnifyingGlass size={18} />
            </label>

            <button className="notification-button" aria-label="Notifications">
              <Bell size={21} />
              <span />
            </button>

            <button className="profile-button" aria-label="Open profile">
              👩🏻
            </button>
          </div>
        </header>

        <section className="dashboard-grid">
          {/* Balance */}

          <article className="dashboard-card balance-card">
            <div className="card-heading">
              <span>Total Balance</span>

              <button aria-label="Balance options">
                <DotsThree size={24} weight="bold" />
              </button>
            </div>

            <h2>$2,460.00</h2>

            <div className="balance-details">
              <div>
                <span className="balance-label">
                  <span className="round-icon">
                    <TrendDown size={16} weight="bold" />
                  </span>
                  Income
                </span>

                <strong className="income-value">$3,010.00</strong>
              </div>

              <div>
                <span className="balance-label">
                  <span className="round-icon">
                    <TrendUp size={16} weight="bold" />
                  </span>
                  Expenses
                </span>

                <strong className="expense-value">$530.00</strong>
              </div>
            </div>
          </article>

          {/* Overview */}

          <article className="dashboard-card overview-card">
            <div className="card-heading">
              <span>This Month Overview</span>
            </div>

            <div className="overview-content">
              <div className="overview-donut-chart">
                <div className="overview-donut-centre">
                  <strong>$3,540</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="overview-list">
                {overviewItems.map((item) => (
                  <div className="overview-item" key={item.label}>
                    <span
                      className="overview-dot"
                      style={{ backgroundColor: item.color }}
                    />

                    <div>
                      <span>{item.label}</span>
                      <strong>{formatCurrency(item.amount)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Recent transactions */}

          <article className="dashboard-card transactions-card">
            <div className="card-heading">
              <span>Recent Transactions</span>

              <button className="view-all-button">View all</button>
            </div>

            <div className="transactions-list">
              {transactions.map((transaction) => {
                const TransactionIcon = transaction.icon;

                return (
                  <div className="transaction-item" key={transaction.id}>
                    <div
                      className="transaction-icon"
                      style={{ backgroundColor: transaction.color }}
                    >
                      <TransactionIcon size={20} weight="fill" />
                    </div>

                    <div className="transaction-information">
                      <strong>{transaction.title}</strong>
                      <span>{transaction.description}</span>
                    </div>

                    <div className="transaction-amount">
                      <strong
                        className={
                          transaction.type === "income"
                            ? "positive-amount"
                            : "negative-amount"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </strong>

                      <span>{transaction.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          {/* Expense categories */}

          <article className="dashboard-card categories-card">
            <div className="card-heading">
              <span>Top Expense Categories</span>

              <button className="month-button">This Month⌄</button>
            </div>

            <div className="categories-list">
              {expenseCategories.map((category) => {
                const CategoryIcon = category.icon;

                return (
                  <div className="category-item" key={category.name}>
                    <div
                      className="category-icon"
                      style={{ backgroundColor: category.color }}
                    >
                      <CategoryIcon size={16} weight="fill" />
                    </div>

                    <div className="category-content">
                      <div className="category-heading">
                        <span>{category.name}</span>

                        <strong>
                          {formatCurrency(category.amount)} (
                          {category.percentage}%)
                        </strong>
                      </div>

                      <div className="progress-background">
                        <div
                          className="progress-value"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </main>

      <button className="floating-button" aria-label="Add transaction"  onClick={() => navigate("/newTransaction")}>
        <Plus size={28} />
      </button>
    </div>
  );
}

export default Dashboard;