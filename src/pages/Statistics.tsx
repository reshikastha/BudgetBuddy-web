import {useMemo, useState } from "react";

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
import { useFinance } from "../context/FinanceContext";
import SidebarNav from "../components/SidebarNav";

const categoryColors: Record<string, string> = {
  groceries: "#84cc16",
  rent: "#8b5cf6",
  utilities: "#f59e0b",
  transportation: "#06b6d4",
  transport: "#06b6d4",
  entertainment: "#ec4899",
  dining: "#f97316",
  health: "#e11d48",
  insurance: "#64748b",
  savings: "#10b981",
  clothing: "#a855f7",
  personal: "#ef4444",
  home: "#8b5cf6",
  housing: "#8b5cf6",
  income: "#84cc16",
  others: "#64748b",
};

const categoryClasses: Record<string, string> = {
  home: "category-grey",
  housing: "category-grey",
  rent: "category-purple",
  personal: "category-purple",
  groceries: "category-grey",
  income: "category-green",
  utilities: "category-grey",
};

function formatMoney(amount: number): string {
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

function isDateInCurrentWeek(
  transactionDate: Date,
  currentDate: Date,
): boolean {
  const startOfWeek = new Date(currentDate);

  const currentDay = startOfWeek.getDay();
  const differenceToMonday =
    currentDay === 0 ? -6 : 1 - currentDay;

  startOfWeek.setDate(
    startOfWeek.getDate() + differenceToMonday,
  );

  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return (
    transactionDate >= startOfWeek &&
    transactionDate < endOfWeek
  );
}

function filterTransactionsByPeriod(
  transactions: Transaction[],
  period: TimePeriod,
): Transaction[] {
  const currentDate = new Date();

  return transactions.filter((transaction) => {
    const transactionDate = transaction.date;

   // Ignore transactions without a valid date
    if (!transactionDate) {
      return false;
    }

    if (period === "weekly") {
      return isDateInCurrentWeek(
        transactionDate,
        currentDate,
      );
    }

    if (period === "monthly") {
      return (
        transactionDate.getMonth() ===
          currentDate.getMonth() &&
        transactionDate.getFullYear() ===
          currentDate.getFullYear()
      );
    }

    return (
      transactionDate.getFullYear() ===
      currentDate.getFullYear()
    );
  });
}

function getPeriodLabel(period: TimePeriod): string {
  if (period === "weekly") {
    return "This Week";
  }

  if (period === "monthly") {
    return "This Month";
  }

  return "This Year";
}

function getChartLabel(period: TimePeriod): string {
  if (period === "weekly") {
    return "Current Week";
  }

  if (period === "monthly") {
    return new Date().toLocaleDateString("en-AU", {
      month: "short",
    });
  }

  return String(new Date().getFullYear());
}

function Statistics() {
  const [period, setPeriod] =
    useState<TimePeriod>("yearly");

  const {
    transactions,
    totalBalance,
    loading,
    error,
  } = useFinance();

  const filteredTransactions = useMemo(() => {
    return filterTransactionsByPeriod(
      transactions,
      period,
    );
  }, [transactions, period]);

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter(
        (transaction) => transaction.type === "Income",
      )
      .reduce(
        (total, transaction) =>
          total +  Number(transaction.amount ?? 0),
        0,
      );
  }, [filteredTransactions]);

  const totalExpenses = useMemo(() => {
    return filteredTransactions
      .filter(
        (transaction) => transaction.type === "Expense",
      )
      .reduce(
        (total, transaction) =>
          total +  Number(transaction.amount ?? 0),
        0,
      );
  }, [filteredTransactions]);

  const expenseCategories = useMemo<
    ExpenseCategory[]
  >(() => {
    const categoryTotals: Record<string, number> = {};

    filteredTransactions
      .filter(
        (transaction) => transaction.type === "Expense",
      )
      .forEach((transaction) => {
        const category =
          transaction.category?.toLowerCase() || "others";

        categoryTotals[category] =
          (categoryTotals[category] ?? 0) +
          Number(transaction.amount ?? 0)
      });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        name: formatCategory(category),
        amount,
        percentage:
          totalExpenses > 0
            ? (amount / totalExpenses) * 100
            : 0,
        color:
          categoryColors[category] ??
          categoryColors.others,
      }))
      .sort(
        (firstCategory, secondCategory) =>
          secondCategory.amount -
          firstCategory.amount,
      );
  }, [filteredTransactions, totalExpenses]);

  const recentTransactions = useMemo(() => {
    return filteredTransactions.slice(0, 5);
  }, [filteredTransactions]);

  const highestChartAmount = Math.max(
    totalIncome,
    totalExpenses,
    100,
  );

  const chartMaximum =
    Math.ceil(highestChartAmount / 100) * 100;

  const incomeBarHeight =
    (totalIncome / chartMaximum) * 185;

  const expenseBarHeight =
    (totalExpenses / chartMaximum) * 185;

  const chartAxisValues = [
    chartMaximum,
    chartMaximum * 0.8,
    chartMaximum * 0.6,
    chartMaximum * 0.4,
    chartMaximum * 0.2,
    0,
  ];

  const donutGradient = useMemo(() => {
    if (
      expenseCategories.length === 0 ||
      totalExpenses === 0
    ) {
      return "conic-gradient(#374151 0% 100%)";
    }

    let currentPercentage = 0;

    const gradientSections = expenseCategories.map(
      (category) => {
        const startPercentage = currentPercentage;

        currentPercentage += category.percentage;

        return `${category.color} ${startPercentage}% ${currentPercentage}%`;
      },
    );

    return `conic-gradient(${gradientSections.join(
      ", ",
    )})`;
  }, [expenseCategories, totalExpenses]);

  if (loading) {
    return (
      <div className="finance-layout">
        <SidebarNav />

        <main className="finance-page">
          <div className="finance-loading">
            Loading statistics...
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="finance-layout">

    <SidebarNav/>
    <main className="finance-page">
      <header className="finance-page-header">
        <div>
          <h1>Statistics</h1>
          <p>Track your income, expenses and spending trends.</p>
        </div>

        
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
              {chartAxisValues?.map(
                  (axisValue, index) => (
                    <span key={index}>
                      {formatMoney(axisValue)}
                    </span>
                  ),
                )}
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
                        title={`Income: ${formatMoney(
                          totalIncome,
                        )}`}
                        style={{
                          height: `${incomeBarHeight}px`,
                        }}
                      />

                      <span
                        className="expense-bar"
                        title={`Expenses: ${formatMoney(
                          totalExpenses,
                        )}`}
                        style={{
                          height: `${expenseBarHeight}px`,
                        }}
                      />
                    </div>

                    <small>{getChartLabel(period)}</small>
                </div>

              </div>
            </div>
          </div>

          <div className="statistics-chart-summary">
              <span>
                Income:{" "}
                <strong className="positive-text">
                  {formatMoney(totalIncome)}
                </strong>
              </span>

              <span>
                Expenses:{" "}
                <strong className="negative-text">
                  {formatMoney(totalExpenses)}
                </strong>
              </span>
            </div>
        </article>

        <article className="finance-card category-breakdown-card">
          <div className="card-title">
            <h2>Category Breakdown</h2>
          </div>

          <div className="category-donut-container">
            <div className="statistics-donut"  style={{
                  background: donutGradient,
                }}>
              <div className="statistics-donut-centre">
                 <strong>
                    {formatMoney(totalExpenses)}
                  </strong>

                  <span>Total Expenses</span>
              </div>
            </div>
          </div>

         
            <div className="breakdown-list">
              {expenseCategories.length === 0 ? (
                <p className="statistics-empty-message">
                  No expense data for this period.
                </p>
              ) : (
                expenseCategories?.map((category) => (
                  <div
                    className="breakdown-item"
                    key={category.name}
                  >
                    <span
                      className="breakdown-dot"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />

                    <span className="breakdown-name">
                      {category.name}{" "}
                      {category.percentage.toFixed(1)}%
                    </span>

                    <strong>
                      {formatMoney( Number(category.amount ?? 0))}
                    </strong>
                  </div>
                ))
              )}
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
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="statistics-table-empty"
                    >
                      No transactions found for this period.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map(
                    (transaction) => {
                        const category = transaction.category?.trim() || "others";
                      const categoryKey = category.toLowerCase();

                         const transactionType = transaction.type?.toLowerCase() || "Expense"; 
                      const isIncome =
                        transaction.type === "Income";
                        const formattedDate = transaction.date
                        ? transaction.date.toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "No date";
                      return (
                        <tr key={transaction.id}>
                          <td>
                           {formattedDate}
                          </td>

                          <td>
                            {transaction.description ||
                              "No description"}
                          </td>

                          <td>
                            <span
                              className={`category-badge ${
                                categoryClasses[
                                  categoryKey
                                ] ?? "category-grey"
                              }`}
                            >
                              {formatCategory(
                                category
                              )}
                            </span>
                          </td>

                          <td>
                            {isIncome
                              ? "Income"
                              : "Expense"}
                          </td>

                          <td
                            className={`amount-column ${
                              isIncome
                                ? "positive-text"
                                : "negative-text"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatMoney(
                            Number(transaction.amount ?? 0)
                            )}
                          </td>
                        </tr>
                      );
                    },
                  )
                )}
              </tbody>
          </table>
        </div>
      </section>

      <section className="mobile-balance-card">
        <div>
          <span>Total Balance</span>
          <strong> {formatMoney(totalBalance)}</strong>
        </div>

        <ChartLineUp size={40} weight="duotone" />

        <span className="balance-growth">
          <ArrowUpRight size={16} />
         Live Firebase data
        </span>
      </section>
    </main>
    </div>
  );
}

export default Statistics;