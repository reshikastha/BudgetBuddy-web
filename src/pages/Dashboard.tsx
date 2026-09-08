// import {
//   Bell,
//   Car,
//   ChartBar,
//   DotsThree,
//   ForkKnife,
//   Gear,

//   Handbag,
//   House,
//   List,
//   MagnifyingGlass,
//   Money,
//   PiggyBank,
//   Plus,
//   Receipt,
//   SignOut,
//   ShoppingCart,
//   SquaresFour,
//   TrendDown,
//   TrendUp,
//   User,
//   Wallet,
//   X,
// } from "@phosphor-icons/react";

// import { useState } from "react";

// import type {
//   ExpenseCategory,
//   OverviewItem,
//   SidebarItem,
//   Transaction,
// } from "../types/dashboard";

// import "../styles/dashboard.css";
// import SidebarNav from "../components/SidebarNav";
// import { useNavigate } from "react-router-dom";

// const transactions: Transaction[] = [
//   {
//     id: 1,
//     title: "Rent",
//     description: "Housing",
//     amount: 480,
//     date: "5 Oct",
//     type: "expense",
//     icon: House,
//     color: "#0ea5e9",
//   },
//   {
//     id: 2,
//     title: "Personal",
//     description: "Sushi",
//     amount: 20,
//     date: "5 Oct",
//     type: "expense",
//     icon: User,
//     color: "#c026d3",
//   },
//   {
//     id: 3,
//     title: "Groceries",
//     description: "Some meat",
//     amount: 50,
//     date: "5 Oct",
//     type: "expense",
//     icon: ShoppingCart,
//     color: "#64748b",
//   },
//   {
//     id: 4,
//     title: "Income",
//     description: "September salary",
//     amount: 2000,
//     date: "5 Oct",
//     type: "income",
//     icon: Money,
//     color: "#22c55e",
//   },
// ];

// const expenseCategories: ExpenseCategory[] = [
//   {
//     name: "Housing",
//     amount: 480,
//     percentage: 45,
//     color: "#ef4444",
//     icon: House,
//   },
//   {
//     name: "Food & Dining",
//     amount: 120,
//     percentage: 22,
//     color: "#f59e0b",
//     icon: ForkKnife,
//   },
//   {
//     name: "Transport",
//     amount: 80,
//     percentage: 15,
//     color: "#ef4444",
//     icon: Car,
//   },
//   {
//     name: "Shopping",
//     amount: 50,
//     percentage: 9,
//     color: "#8b5cf6",
//     icon: Handbag,
//   },
//   {
//     name: "Others",
//     amount: 30,
//     percentage: 9,
//     color: "#8b5cf6",
//     icon: DotsThree,
//   },
// ];

// const overviewItems: OverviewItem[] = [
//   {
//     label: "Income",
//     amount: 3010,
//     color: "#38bdf8",
//   },
//   {
//     label: "Expenses",
//     amount: 530,
//     color: "#ef4444",
//   },
//   {
//     label: "Savings",
//     amount: 2480,
//     color: "#84cc16",
//   },
// ];

// function formatCurrency(amount: number): string {
//   return amount.toLocaleString("en-AU", {
//     style: "currency",
//     currency: "AUD",
//   });
// }

// function Dashboard() {
//     const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

//   return (
//     <div className="dashboard-layout">
      
//       <SidebarNav/>

//       <main className="dashboard-main">
//         <header className="dashboard-header">
//           <button
//             className="mobile-menu"
//             onClick={() => setSidebarOpen(true)}
//             aria-label="Open menu"
//           >
//             <List size={24} />
//           </button>

//           <div className="welcome-message">
//             <span>Hello,</span>

//             <h1>
//               Reshika <span>👋</span>
//             </h1>
//           </div>

//           <div className="header-controls">
//             <label className="search-field">
//               <input
//                 type="search"
//                 placeholder="Search anything..."
//                 aria-label="Search"
//               />

//               <MagnifyingGlass size={18} />
//             </label>

//             <button className="notification-button" aria-label="Notifications">
//               <Bell size={21} />
//               <span />
//             </button>

//             <button className="profile-button" aria-label="Open profile">
//               👩🏻
//             </button>
//           </div>
//         </header>

//         <section className="dashboard-grid">
//           {/* Balance */}

//           <article className="dashboard-card balance-card">
//             <div className="card-heading">
//               <span>Total Balance</span>

//               <button aria-label="Balance options">
//                 <DotsThree size={24} weight="bold" />
//               </button>
//             </div>

//             <h2>$2,460.00</h2>

//             <div className="balance-details">
//               <div>
//                 <span className="balance-label">
//                   <span className="round-icon">
//                     <TrendDown size={16} weight="bold" />
//                   </span>
//                   Income
//                 </span>

//                 <strong className="income-value">$3,010.00</strong>
//               </div>

//               <div>
//                 <span className="balance-label">
//                   <span className="round-icon">
//                     <TrendUp size={16} weight="bold" />
//                   </span>
//                   Expenses
//                 </span>

//                 <strong className="expense-value">$530.00</strong>
//               </div>
//             </div>
//           </article>

//           {/* Overview */}

//           <article className="dashboard-card overview-card">
//             <div className="card-heading">
//               <span>This Month Overview</span>
//             </div>

//             <div className="overview-content">
//               <div className="overview-donut-chart">
//                 <div className="overview-donut-centre">
//                   <strong>$3,540</strong>
//                   <span>Total</span>
//                 </div>
//               </div>

//               <div className="overview-list">
//                 {overviewItems.map((item) => (
//                   <div className="overview-item" key={item.label}>
//                     <span
//                       className="overview-dot"
//                       style={{ backgroundColor: item.color }}
//                     />

//                     <div>
//                       <span>{item.label}</span>
//                       <strong>{formatCurrency(item.amount)}</strong>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </article>

//           {/* Recent transactions */}

//           <article className="dashboard-card transactions-card">
//             <div className="card-heading">
//               <span>Recent Transactions</span>

//               <button className="view-all-button">View all</button>
//             </div>

//             <div className="transactions-list">
//               {transactions.map((transaction) => {
//                 const TransactionIcon = transaction.icon;

//                 return (
//                   <div className="transaction-item" key={transaction.id}>
//                     <div
//                       className="transaction-icon"
//                       style={{ backgroundColor: transaction.color }}
//                     >
//                       <TransactionIcon size={20} weight="fill" />
//                     </div>

//                     <div className="transaction-information">
//                       <strong>{transaction.title}</strong>
//                       <span>{transaction.description}</span>
//                     </div>

//                     <div className="transaction-amount">
//                       <strong
//                         className={
//                           transaction.type === "income"
//                             ? "positive-amount"
//                             : "negative-amount"
//                         }
//                       >
//                         {transaction.type === "income" ? "+" : "-"}
//                         {formatCurrency(transaction.amount)}
//                       </strong>

//                       <span>{transaction.date}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </article>

//           {/* Expense categories */}

//           <article className="dashboard-card categories-card">
//             <div className="card-heading">
//               <span>Top Expense Categories</span>

//               <button className="month-button">This Month⌄</button>
//             </div>

//             <div className="categories-list">
//               {expenseCategories.map((category) => {
//                 const CategoryIcon = category.icon;

//                 return (
//                   <div className="category-item" key={category.name}>
//                     <div
//                       className="category-icon"
//                       style={{ backgroundColor: category.color }}
//                     >
//                       <CategoryIcon size={16} weight="fill" />
//                     </div>

//                     <div className="category-content">
//                       <div className="category-heading">
//                         <span>{category.name}</span>

//                         <strong>
//                           {formatCurrency(category.amount)} (
//                           {category.percentage}%)
//                         </strong>
//                       </div>

//                       <div className="progress-background">
//                         <div
//                           className="progress-value"
//                           style={{
//                             width: `${category.percentage}%`,
//                             backgroundColor: category.color,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </article>
//         </section>
//       </main>

//       <button className="floating-button" aria-label="Add transaction"  onClick={() => navigate("/newTransaction")}>
//         <Plus size={28} />
//       </button>
//     </div>
//   );
// }

// export default Dashboard;


// src/pages/Dashboard.tsx

import {
  Bell,
  Car,
  DotsThree,
  ForkKnife,
  Handbag,
  House,
  List,
  MagnifyingGlass,
  Money,
  Plus,
  ShoppingCart,
  TrendDown,
  TrendUp,
  User,
  type Icon,
} from "@phosphor-icons/react";

import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import SidebarNav from "../components/SidebarNav";
import { useFinance } from "../context/FinanceContext";
import { auth } from "../config/firebase";

import "../styles/dashboard.css";

type CategoryConfiguration = {
  label: string;
  color: string;
  icon: Icon;
};

type FirestoreDate = {
  toDate?: () => Date;
  seconds?: number;
};

const categoryConfiguration: Record<
  string,
  CategoryConfiguration
> = {
  housing: {
    label: "Housing",
    color: "#ef4444",
    icon: House,
  },

  rent: {
    label: "Housing",
    color: "#ef4444",
    icon: House,
  },

  food: {
    label: "Food & Dining",
    color: "#f59e0b",
    icon: ForkKnife,
  },

  "food & dining": {
    label: "Food & Dining",
    color: "#f59e0b",
    icon: ForkKnife,
  },

  dining: {
    label: "Food & Dining",
    color: "#f59e0b",
    icon: ForkKnife,
  },

  groceries: {
    label: "Groceries",
    color: "#64748b",
    icon: ShoppingCart,
  },

  transport: {
    label: "Transport",
    color: "#f43f5e",
    icon: Car,
  },

  transportation: {
    label: "Transport",
    color: "#f43f5e",
    icon: Car,
  },

  shopping: {
    label: "Shopping",
    color: "#8b5cf6",
    icon: Handbag,
  },

  personal: {
    label: "Personal",
    color: "#c026d3",
    icon: User,
  },

  income: {
    label: "Income",
    color: "#22c55e",
    icon: Money,
  },

  salary: {
    label: "Income",
    color: "#22c55e",
    icon: Money,
  },

  other: {
    label: "Others",
    color: "#8b5cf6",
    icon: DotsThree,
  },

  others: {
    label: "Others",
    color: "#8b5cf6",
    icon: DotsThree,
  },
};

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

function convertToDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    const firestoreDate = value as FirestoreDate;

    if (
      typeof firestoreDate.toDate === "function"
    ) {
      return firestoreDate.toDate();
    }

    if (
      typeof firestoreDate.seconds === "number"
    ) {
      return new Date(
        firestoreDate.seconds * 1000,
      );
    }
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

  return null;
}

function formatTransactionDate(
  value: unknown,
): string {
  const date = convertToDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

function isCurrentMonth(value: unknown): boolean {
  const transactionDate = convertToDate(value);

  if (!transactionDate) {
    return false;
  }

  const currentDate = new Date();

  return (
    transactionDate.getMonth() ===
      currentDate.getMonth() &&
    transactionDate.getFullYear() ===
      currentDate.getFullYear()
  );
}

/*
 * These helpers prevent TypeScript errors if your existing
 * TransactionType uses different capitalisation.
 */
function isIncomeTransaction(
  type: unknown,
): boolean {
  return String(type).trim().toLowerCase() ===
    "income";
}

function isExpenseTransaction(
  type: unknown,
): boolean {
  return String(type).trim().toLowerCase() ===
    "expense";
}

function getCategoryConfiguration(
  category: unknown,
): CategoryConfiguration {
  const categoryName =
    typeof category === "string"
      ? category.trim()
      : "";

  const normalisedCategory =
    categoryName.toLowerCase();

  return (
    categoryConfiguration[normalisedCategory] ?? {
      label: categoryName || "Others",
      color: "#8b5cf6",
      icon: DotsThree,
    }
  );
}

function Dashboard() {
  const navigate = useNavigate();

  /*
   * This data comes from Firebase through FinanceContext.
   *
   * If your context uses financeLoading instead of loading,
   * change loading below to:
   *
   * loading: financeLoading
   */
  const {
    wallets,
    transactions,
    loading,
    error,
  } = useFinance();

  const [sidebarOpen, setSidebarOpen] =
    useState<boolean>(false);

  const [searchText, setSearchText] =
    useState<string>("");

  const currentUser = auth.currentUser;

  const firstName =
    currentUser?.displayName
      ?.trim()
      .split(/\s+/)[0] || "Reshika";

  const dashboardData = useMemo(() => {
    /*
     * Calculate total balance from Firebase wallets.
     */
    const totalBalance = wallets.reduce(
      (total, wallet) => {
        return (
          total +
          Number(wallet.amount ?? 0)
        );
      },
      0,
    );

    /*
     * Get only current-month transactions.
     */
    const monthlyTransactions =
      transactions.filter((transaction) =>
        isCurrentMonth(transaction.date),
      );

    /*
     * Calculate current-month income.
     */
    const monthlyIncome =
      monthlyTransactions
        .filter((transaction) =>
          isIncomeTransaction(
            transaction.type,
          ),
        )
        .reduce((total, transaction) => {
          return (
            total +
            Number(transaction.amount ?? 0)
          );
        }, 0);

    /*
     * Calculate current-month expenses.
     */
    const monthlyExpenses =
      monthlyTransactions
        .filter((transaction) =>
          isExpenseTransaction(
            transaction.type,
          ),
        )
        .reduce((total, transaction) => {
          return (
            total +
            Number(transaction.amount ?? 0)
          );
        }, 0);

    const monthlySavings =
      monthlyIncome - monthlyExpenses;

    /*
     * Group expense amounts by their displayed category.
     */
    const categoryTotals =
      monthlyTransactions
        .filter((transaction) =>
          isExpenseTransaction(
            transaction.type,
          ),
        )
        .reduce<Record<string, number>>(
          (totals, transaction) => {
            const configuration =
              getCategoryConfiguration(
                transaction.category,
              );

            totals[configuration.label] =
              (totals[configuration.label] ??
                0) +
              Number(transaction.amount ?? 0);

            return totals;
          },
          {},
        );

    const expenseCategories =
      Object.entries(categoryTotals)
        .map(([categoryName, amount]) => {
          const configuration =
            getCategoryConfiguration(
              categoryName,
            );

          const percentage =
            monthlyExpenses > 0
              ? Math.round(
                  (amount /
                    monthlyExpenses) *
                    100,
                )
              : 0;

          return {
            name: configuration.label,
            amount,
            percentage,
            color: configuration.color,
            icon: configuration.icon,
          };
        })
        .sort(
          (firstCategory, secondCategory) =>
            secondCategory.amount -
            firstCategory.amount,
        )
        .slice(0, 5);

    /*
     * Sort transactions newest first.
     */
    const recentTransactions = [
      ...transactions,
    ]
      .sort(
        (
          firstTransaction,
          secondTransaction,
        ) => {
          const firstDate = convertToDate(
            firstTransaction.date,
          );

          const secondDate = convertToDate(
            secondTransaction.date,
          );

          return (
            (secondDate?.getTime() ?? 0) -
            (firstDate?.getTime() ?? 0)
          );
        },
      )
      .slice(0, 5);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      monthlySavings,
      expenseCategories,
      recentTransactions,
    };
  }, [wallets, transactions]);

  /*
   * Search the five recent transactions.
   */
  const filteredTransactions =
    useMemo(() => {
      const search =
        searchText.trim().toLowerCase();

      if (!search) {
        return dashboardData.recentTransactions;
      }

      return dashboardData.recentTransactions.filter(
        (transaction) => {
          const category = String(
            transaction.category ?? "",
          ).toLowerCase();

          const description = String(
            transaction.description ?? "",
          ).toLowerCase();

          const transactionType = String(
            transaction.type ?? "",
          ).toLowerCase();

          const amount = String(
            transaction.amount ?? "",
          ).toLowerCase();

          return (
            category.includes(search) ||
            description.includes(search) ||
            transactionType.includes(search) ||
            amount.includes(search)
          );
        },
      );
    }, [
      dashboardData.recentTransactions,
      searchText,
    ]);

  const overviewItems = [
    {
      label: "Income",
      amount: dashboardData.monthlyIncome,
      color: "#38bdf8",
    },

    {
      label: "Expenses",
      amount: dashboardData.monthlyExpenses,
      color: "#ef4444",
    },

    {
      label: "Savings",
      amount: dashboardData.monthlySavings,
      color: "#84cc16",
    },
  ];

  const monthlyActivityTotal =
    dashboardData.monthlyIncome +
    dashboardData.monthlyExpenses;

  const incomePercentage =
    monthlyActivityTotal > 0
      ? (dashboardData.monthlyIncome /
          monthlyActivityTotal) *
        100
      : 0;

  const overviewDonutBackground =
    monthlyActivityTotal > 0
      ? `conic-gradient(
          #38bdf8 0% ${incomePercentage}%,
          #ef4444 ${incomePercentage}% 100%
        )`
      : "#334155";

  if (loading) {
    return (
      <div className="dashboard-layout">
        <SidebarNav />

        <main className="dashboard-main">
          <div className="dashboard-status">
            Loading your dashboard...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <SidebarNav />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button
            type="button"
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(
                (currentValue) =>
                  !currentValue,
              )
            }
            aria-label={
              sidebarOpen
                ? "Close menu"
                : "Open menu"
            }
          >
            <List size={24} />
          </button>

          <div className="welcome-message">
            <span>Hello,</span>

            <h1>
              {firstName} <span>👋</span>
            </h1>
          </div>

          <div className="header-controls">
            <label className="search-field">
              <input
                type="search"
                placeholder="Search transactions..."
                aria-label="Search transactions"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value,
                  )
                }
              />

              <MagnifyingGlass size={18} />
            </label>

            <button
              type="button"
              className="notification-button"
              aria-label="Notifications"
            >
              <Bell size={21} />

              <span />
            </button>

            <button
              type="button"
              className="profile-button"
              aria-label="Open profile"
              onClick={() =>
                navigate("/profile")
              }
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={firstName}
                />
              ) : (
                "👩🏻"
              )}
            </button>
          </div>
        </header>

        {error && (
          <p
            className="dashboard-error"
            role="alert"
          >
            {String(error)}
          </p>
        )}

        <section className="dashboard-grid">
          {/* Total balance */}

          <article className="dashboard-card balance-card">
            <div className="card-heading">
              <span>Total Balance</span>

              <button
                type="button"
                aria-label="Balance options"
              >
                <DotsThree
                  size={24}
                  weight="bold"
                />
              </button>
            </div>

            <h2>
              {formatCurrency(
                dashboardData.totalBalance,
              )}
            </h2>

            <div className="balance-details">
              <div>
                <span className="balance-label">
                  <span className="round-icon">
                    <TrendDown
                      size={16}
                      weight="bold"
                    />
                  </span>

                  Income
                </span>

                <strong className="income-value">
                  {formatCurrency(
                    dashboardData.monthlyIncome,
                  )}
                </strong>
              </div>

              <div>
                <span className="balance-label">
                  <span className="round-icon">
                    <TrendUp
                      size={16}
                      weight="bold"
                    />
                  </span>

                  Expenses
                </span>

                <strong className="expense-value">
                  {formatCurrency(
                    dashboardData.monthlyExpenses,
                  )}
                </strong>
              </div>
            </div>
          </article>

          {/* This month overview */}

          <article className="dashboard-card overview-card">
            <div className="card-heading">
              <span>
                This Month Overview
              </span>
            </div>

            <div className="overview-content">
              <div
                className="overview-donut-chart"
                style={{
                  background:
                    overviewDonutBackground,
                }}
              >
                <div className="overview-donut-centre">
                  <strong>
                    {formatCurrency(
                      monthlyActivityTotal,
                    )}
                  </strong>

                  <span>Total</span>
                </div>
              </div>

              <div className="overview-list">
                {overviewItems.map((item) => (
                  <div
                    className="overview-item"
                    key={item.label}
                  >
                    <span
                      className="overview-dot"
                      style={{
                        backgroundColor:
                          item.color,
                      }}
                    />

                    <div>
                      <span>{item.label}</span>

                      <strong>
                        {formatCurrency(
                          item.amount,
                        )}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Recent transactions */}

          <article className="dashboard-card transactions-card">
            <div className="card-heading">
              <span>
                Recent Transactions
              </span>

              <button
                type="button"
                className="view-all-button"
                onClick={() =>
                  navigate("/transactions")
                }
              >
                View all
              </button>
            </div>

            <div className="transactions-list">
              {filteredTransactions.length ===
              0 ? (
                <p className="empty-dashboard-message">
                  {searchText
                    ? "No matching transactions found."
                    : "No transactions have been added yet."}
                </p>
              ) : (
                filteredTransactions.map(
                  (transaction) => {
                    const incomeTransaction =
                      isIncomeTransaction(
                        transaction.type,
                      );

                    const configuration =
                      incomeTransaction
                        ? categoryConfiguration.income
                        : getCategoryConfiguration(
                            transaction.category,
                          );

                    const TransactionIcon =
                      configuration.icon;

                    return (
                      <div
                        className="transaction-item"
                        key={String(
                          transaction.id,
                        )}
                      >
                        <div
                          className="transaction-icon"
                          style={{
                            backgroundColor:
                              configuration.color,
                          }}
                        >
                          <TransactionIcon
                            size={20}
                            weight="fill"
                          />
                        </div>

                        <div className="transaction-information">
                          <strong>
                            {incomeTransaction
                              ? "Income"
                              : configuration.label}
                          </strong>

                          <span>
                            {transaction.description ||
                              "No description"}
                          </span>
                        </div>

                        <div className="transaction-amount">
                          <strong
                            className={
                              incomeTransaction
                                ? "positive-amount"
                                : "negative-amount"
                            }
                          >
                            {incomeTransaction
                              ? "+"
                              : "-"}

                            {formatCurrency(
                              Number(
                                transaction.amount ??
                                  0,
                              ),
                            )}
                          </strong>

                          <span>
                            {formatTransactionDate(
                              transaction.date,
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  },
                )
              )}
            </div>
          </article>

          {/* Top expense categories */}

          <article className="dashboard-card categories-card">
            <div className="card-heading">
              <span>
                Top Expense Categories
              </span>

            
            </div>

            <div className="categories-list">
              {dashboardData.expenseCategories
                .length === 0 ? (
                <p className="empty-dashboard-message">
                  No expenses recorded this month.
                </p>
              ) : (
                dashboardData.expenseCategories.map(
                  (category) => {
                    const CategoryIcon =
                      category.icon;

                    return (
                      <div
                        className="category-item"
                        key={category.name}
                      >
                        <div
                          className="category-icon"
                          style={{
                            backgroundColor:
                              category.color,
                          }}
                        >
                          <CategoryIcon
                            size={16}
                            weight="fill"
                          />
                        </div>

                        <div className="category-content">
                          <div className="category-heading">
                            <span>
                              {category.name}
                            </span>

                            <strong>
                              {formatCurrency(
                                category.amount,
                              )}{" "}
                              (
                              {
                                category.percentage
                              }
                              %)
                            </strong>
                          </div>

                          <div className="progress-background">
                            <div
                              className="progress-value"
                              style={{
                                width: `${category.percentage}%`,
                                backgroundColor:
                                  category.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  },
                )
              )}
            </div>
          </article>
        </section>
      </main>

      <button
        type="button"
        className="floating-button"
        aria-label="Add transaction"
        onClick={() =>
          navigate("/newTransaction")
        }
      >
        <Plus size={28} />
      </button>
    </div>
  );
}

export default Dashboard;
