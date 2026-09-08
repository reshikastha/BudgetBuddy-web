// import {
//   Briefcase,
//   CaretRight,
//   Plus,
//   RocketLaunch,
//   TrendUp,
//   WalletIcon,
// } from "@phosphor-icons/react";

// import type { WalletType } from "../types/finance";

// import "../styles/finance.css";

// import SidebarNav from "../components/SidebarNav";
// import { useNavigate } from "react-router-dom";

// const wallets: WalletType[] = [
//   {
//     id: 1,
//     name: "Salary",
//     amount: 1510,
//     type: "Primary Wallet",
//     color: "#84cc16",
//     icon: Briefcase,
//   },
//   {
//     id: 2,
//     name: "Side Hustle",
//     amount: 950,
//     type: "Secondary Wallet",
//     color: "#8b5cf6",
//     icon: RocketLaunch,
//   },
// ];

// function formatCurrency(amount: number): string {
//   return amount.toLocaleString("en-AU", {
//     style: "currency",
//     currency: "AUD",
//   });
// }

// function Wallets() {
//       const navigate = useNavigate();
//   return (
//     <div className="finance-layout">

//     <SidebarNav/>
//     <main className="finance-page wallets-page">
//       <header className="finance-page-header">
//         <div>
//           <h1>Wallets</h1>
//           <p>Manage all your wallets in one place.</p>
//         </div>

//         <button className="primary-finance-button" onClick={() => navigate("/newWallet")}>
//           <Plus size={17} weight="bold" />
//           New Wallet
//         </button>
//       </header>

//       <section className="wallet-balance">
//         <strong>$2,460.00</strong>
//         <span>Total Balance</span>
//       </section>

//       <section className="wallet-grid">
//         {wallets.map((wallet) => {
//           const WalletIcon = wallet.icon;

//           return (
//             <article className="wallet-card" key={wallet.id}>
//               <div className="wallet-card-top">
//                 <div
//                   className="wallet-icon"
//                   style={{
//                     backgroundColor: wallet.color,
//                   }}
//                 >
//                   {/* <WalletIcon size={25} weight="fill" /> */}
//                 </div>

//                 <button aria-label={`Open ${wallet.name}`}>
//                   <CaretRight size={20} />
//                 </button>
//               </div>

//               <h2>{wallet.name}</h2>
//               <strong>{formatCurrency(wallet.amount)}</strong>

//               <div className="wallet-type">
//                 <span style={{ backgroundColor: wallet.color }} />
//                 {wallet.type}
//               </div>
//             </article>
//           );
//         })}
//       </section>

//       <section className="wallet-summary-card">
//         <div>
//           <span>Total Balance</span>
//           <strong>$2,460.00</strong>
//         </div>

//         <div className="mini-line-chart">
//           <svg viewBox="0 0 240 80" aria-label="Balance growth chart">
//             <defs>
//               <linearGradient
//                 id="chartArea"
//                 x1="0"
//                 x2="0"
//                 y1="0"
//                 y2="1"
//               >
//                 <stop
//                   offset="0%"
//                   stopColor="#84cc16"
//                   stopOpacity="0.3"
//                 />

//                 <stop
//                   offset="100%"
//                   stopColor="#84cc16"
//                   stopOpacity="0"
//                 />
//               </linearGradient>
//             </defs>

//             <path
//               className="chart-area"
//               d="M0,68 L30,58 L56,62 L82,42 L106,52 L136,31 L164,38 L195,15 L218,23 L240,7 L240,80 L0,80 Z"
//             />

//             <path
//               className="chart-line"
//               d="M0,68 L30,58 L56,62 L82,42 L106,52 L136,31 L164,38 L195,15 L218,23 L240,7"
//             />
//           </svg>
//         </div>

//         <span className="wallet-growth">
//           <TrendUp size={17} weight="bold" />
//           12.5% this month
//         </span>
//       </section>
//     </main>
//     </div>
//   );
// }

// export default Wallets;


// src/pages/Wallets.tsx

import {
  Briefcase,
  CaretRight,
  Plus,
  RocketLaunch,
  TrendUp,
  WalletIcon,
  type Icon,
} from "@phosphor-icons/react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SidebarNav from "../components/SidebarNav";
import { useFinance } from "../context/FinanceContext";

import "../styles/finance.css";
import { colors } from "../theme/theme";

type WalletAppearance = {
  color: string;
  icon: Icon;
};

const walletAppearances: WalletAppearance[] = [
  {
    color: "#84cc16",
    icon: Briefcase,
  },
  {
    color: "#8b5cf6",
    icon: WalletIcon,
  },
  {
    color: "#0ea5e9",
    icon: WalletIcon,
  },
  {
    color: "#f59e0b",
    icon: Briefcase,
  },
  {
    color: "#ec4899",
    icon: WalletIcon,
  },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

function Wallets() {
  const navigate = useNavigate();

  /*
   * Wallets are retrieved from Firebase by FinanceContext.
   */
  const {
    wallets,
    loading: financeLoading,
  } = useFinance();

  /*
   * Calculate total balance from every Firebase wallet.
   */
  const totalBalance = useMemo(() => {
    return wallets.reduce((total, wallet) => {
      return (
        total + Number(wallet.amount ?? 0)
      );
    }, 0);
  }, [wallets]);

  return (
    <div className="finance-layout">
      <SidebarNav />

      <main className="finance-page wallets-page">
        <header className="finance-page-header">
          <div>
            <h1>Wallets</h1>

            <p>
              Manage all your wallets in one place.
            </p>
          </div>

          <button
            type="button"
            className="primary-finance-button"
            onClick={() =>
              navigate("/newWallet")
            }
          >
            <Plus size={17} weight="bold" />

            New Wallet
          </button>
        </header>

        <section className="wallet-balance">
          <strong>
            {formatCurrency(totalBalance)}
          </strong>

          <span>Total Balance</span>
        </section>

        {financeLoading ? (
          <div className="wallet-loading">
            Loading your wallets...
          </div>
        ) : wallets.length === 0 ? (
          <section className="empty-wallets">
            <div className="empty-wallet-icon">
              <WalletIcon
                size={35}
                weight="fill"
              />
            </div>

            <h2>No wallets yet</h2>

            <p>
              Create your first wallet to start
              managing your money.
            </p>

            <button
              type="button"
              className="primary-finance-button"
              onClick={() =>
                navigate("/newWallet")
              }
            >
              <Plus size={17} weight="bold" />

              Create Wallet
            </button>
          </section>
        ) : (
          <section className="wallet-grid">
            {wallets.map((wallet, index) => {
              const appearance =
                walletAppearances[
                  index %
                    walletAppearances.length
                ];

             
              const WalletFallbackIcon =
                appearance.icon;

              const walletId =
                wallet.id !== undefined &&
                wallet.id !== null
                  ? String(wallet.id)
                  : `wallet-${index}`;

              /*
               * NewWallet saves the image URL under
               * the "image" property in Firestore.
               */
              const walletImage =
                typeof wallet.image === "string"
                  ? wallet.image
                  : "";

              const walletName =
                wallet.name?.trim() ||
                "Unnamed Wallet";

              const walletType =
                index === 0
                  ? "Primary Wallet"
                  : "Secondary Wallet";

              return (
                <article
                  className="wallet-card"
                  key={walletId}
                >
                  <div className="wallet-card-top">
                    <div
                      className="wallet-icon"
                      style={{
                        backgroundColor:
                          walletImage
                            ? "transparent"
                            : appearance.color,
                      }}
                    >
                      {walletImage ? (
                        <img
                          src={walletImage}
                          alt={`${walletName} icon`}
                          className="wallet-image"
                        />
                      ) : (
                        <WalletFallbackIcon
                          size={25}
                          weight="fill"
                        />
                      )}
                    </div>
{/* 
                    <button
                      type="button"
                      aria-label={`Open ${walletName}`}
                    >
                      <CaretRight size={20} />
                    </button> */}
                  </div>

                  <h2>{walletName}  :    {formatCurrency(
                      Number(wallet.amount ?? 0),
                    )}</h2>

                  
                  <p style={{color:colors.primary, fontSize:12, lineHeight:1}}>{wallet?.totalIncome}</p>
                  <p style={{color:colors.rose,  fontSize:12}}>{wallet?.totalExpense}</p>

                  <div className="wallet-type">
                    <span
                      style={{
                        backgroundColor:
                          appearance.color,
                      }}
                    />

                    {walletType}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <section className="wallet-summary-card">
          <div>
            <span>Total Balance</span>

            <strong>
              {formatCurrency(totalBalance)}
            </strong>
          </div>

          <div className="mini-line-chart">
            <svg
              viewBox="0 0 240 80"
              aria-label="Balance growth chart"
            >
              <defs>
                <linearGradient
                  id="chartArea"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#84cc16"
                    stopOpacity="0.3"
                  />

                  <stop
                    offset="100%"
                    stopColor="#84cc16"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                className="chart-area"
                d="
                  M0,68
                  L30,58
                  L56,62
                  L82,42
                  L106,52
                  L136,31
                  L164,38
                  L195,15
                  L218,23
                  L240,7
                  L240,80
                  L0,80
                  Z
                "
              />

              <path
                className="chart-line"
                d="
                  M0,68
                  L30,58
                  L56,62
                  L82,42
                  L106,52
                  L136,31
                  L164,38
                  L195,15
                  L218,23
                  L240,7
                "
              />
            </svg>
          </div>

          <span className="wallet-growth">
            <TrendUp
              size={17}
              weight="bold"
            />

            Current wallet balance
          </span>
        </section>
      </main>
    </div>
  );
}

export default Wallets;