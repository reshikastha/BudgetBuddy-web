import { useState } from "react";

import {
  ArrowUpRight,
  CalendarBlank,
  ChartLineUp,
} from "@phosphor-icons/react";

import type {
  ExpenseCategory,
  TimePeriod,
  Transaction,
} from "../types/finance";

import "../styles/finance.css";
import SidebarNav from "../components/SidebarNav";

const expenseCategories: ExpenseCategory[] = [
  {
    name: "Rent",
    amount: 480,
    percentage: 58.2,
    color: "#8b5cf6",
  },
  {
    name: "Groceries",
    amount: 50,
    percentage: 9.1,
    color: "#84cc16",
  },
  {
    name: "Personal",
    amount: 20,
    percentage: 2.4,
    color: "#ef4444",
  },
  {
    name: "Others",
    amount: 250,
    percentage: 30.3,
    color: "#64748b",
  },
];

const transactions: Transaction[] = [
  {
    id: 1,
    date: "5 Oct 2025",
    description: "Rent",
    category: "Home",
    type: "Expense",
    amount: 480,
  },
  {
    id: 2,
    date: "5 Oct 2025",
    description: "Sushi",
    category: "Personal",
    type: "Expense",
    amount: 20,
  },
  {
    id: 3,
    date: "5 Oct 2025",
    description: "Some meat",
    category: "Groceries",
    type: "Expense",
    amount: 50,
  },
  {
    id: 4,
    date: "5 Oct 2025",
    description: "September salary",
    category: "Income",
    type: "Income",
    amount: 2000,
  },
  {
    id: 5,
    date: "2 Oct 2025",
    description: "Electricity bill",
    category: "Utilities",
    type: "Expense",
    amount: 60,
  },
];

const categoryClass: Record<string, string> = {
  Home: "category-grey",
  Personal: "category-purple",
  Groceries: "category-grey",
  Income: "category-green",
  Utilities: "category-grey",
};

function Statistics() {
  const [period, setPeriod] = useState<TimePeriod>("yearly");

  return (
    <div className="finance-layout">

    <SidebarNav/>
    <main className="finance-page">
      <header className="finance-page-header">
        <div>
          <h1>Statistics</h1>
          <p>Track your income, expenses and spending trends.</p>
        </div>

        <button className="period-dropdown">
          <CalendarBlank size={18} />
          This Year
          <span>⌄</span>
        </button>
      </header>

      <div className="period-tabs">
        {(["weekly", "monthly", "yearly"] as TimePeriod[]).map(
          (item) => (
            <button
              key={item}
              className={period === item ? "active-period" : ""}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <section className="statistics-grid">
        <article className="finance-card income-expense-card">
          <div className="card-title">
            <h2>Income vs Expenses</h2>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-income" />
              Income
            </span>

            <span>
              <i className="legend-expense" />
              Expenses
            </span>
          </div>

          <div className="bar-chart">
            <div className="chart-y-axis">
              <span>$2,010</span>
              <span>$1,608</span>
              <span>$1,206</span>
              <span>$804</span>
              <span>$402</span>
              <span>$0</span>
            </div>

            <div className="chart-content">
              <div className="grid-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chart-bars">
                <div className="year-column">
                  <div className="bars">
                    <span
                      className="income-bar"
                      style={{ height: "8px" }}
                    />
                    <span
                      className="expense-bar"
                      style={{ height: "5px" }}
                    />
                  </div>

                  <small>2024</small>
                </div>

                <div className="year-column">
                  <div className="bars">
                    <span
                      className="income-bar"
                      style={{ height: "185px" }}
                    />
                    <span
                      className="expense-bar"
                      style={{ height: "75px" }}
                    />
                  </div>

                  <small>2025</small>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="finance-card category-breakdown-card">
          <div className="card-title">
            <h2>Category Breakdown</h2>
          </div>

          <div className="category-donut-container">
            <div className="statistics-donut">
              <div className="statistics-donut-centre">
                <strong>$5500</strong>
                <span>Total Expenses</span>
              </div>
            </div>
          </div>

          <div className="breakdown-list">
            {expenseCategories.map((category) => (
              <div className="breakdown-item" key={category.name}>
                <span
                  className="breakdown-dot"
                  style={{ backgroundColor: category.color }}
                />

                <span className="breakdown-name">
                  {category.name} {category.percentage}%
                </span>

                <strong>${category.amount}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="finance-card recent-transactions-card">
        <div className="card-title">
          <h2>Recent Transactions</h2>
        </div>

        <div className="transaction-table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="amount-column">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>

                  <td>
                    <span
                      className={`category-badge ${
                        categoryClass[transaction.category] ?? ""
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>

                  <td>{transaction.type}</td>

                  <td
                    className={`amount-column ${
                      transaction.type === "Income"
                        ? "positive-text"
                        : "negative-text"
                    }`}
                  >
                    {transaction.type === "Income" ? "+" : "-"}$
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mobile-balance-card">
        <div>
          <span>Total Balance</span>
          <strong>$2,460.00</strong>
        </div>

        <ChartLineUp size={40} weight="duotone" />

        <span className="balance-growth">
          <ArrowUpRight size={16} />
          12.5% this month
        </span>
      </section>
    </main>
    </div>
  );
}

export default Statistics;