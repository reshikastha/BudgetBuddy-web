import {
  Briefcase,
  CaretRight,
  Plus,
  RocketLaunch,
  TrendUp,
  WalletIcon,
} from "@phosphor-icons/react";

import type { WalletType } from "../types/finance";

import "../styles/finance.css";

import SidebarNav from "../components/SidebarNav";
import { useNavigate } from "react-router-dom";

const wallets: WalletType[] = [
  {
    id: 1,
    name: "Salary",
    amount: 1510,
    type: "Primary Wallet",
    color: "#84cc16",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Side Hustle",
    amount: 950,
    type: "Secondary Wallet",
    color: "#8b5cf6",
    icon: RocketLaunch,
  },
];

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
}

function Wallets() {
      const navigate = useNavigate();
  return (
    <div className="finance-layout">

    <SidebarNav/>
    <main className="finance-page wallets-page">
      <header className="finance-page-header">
        <div>
          <h1>Wallets</h1>
          <p>Manage all your wallets in one place.</p>
        </div>

        <button className="primary-finance-button" onClick={() => navigate("/newWallet")}>
          <Plus size={17} weight="bold" />
          New Wallet
        </button>
      </header>

      <section className="wallet-balance">
        <strong>$2,460.00</strong>
        <span>Total Balance</span>
      </section>

      <section className="wallet-grid">
        {wallets.map((wallet) => {
          const WalletIcon = wallet.icon;

          return (
            <article className="wallet-card" key={wallet.id}>
              <div className="wallet-card-top">
                <div
                  className="wallet-icon"
                  style={{
                    backgroundColor: wallet.color,
                  }}
                >
                  {/* <WalletIcon size={25} weight="fill" /> */}
                </div>

                <button aria-label={`Open ${wallet.name}`}>
                  <CaretRight size={20} />
                </button>
              </div>

              <h2>{wallet.name}</h2>
              <strong>{formatCurrency(wallet.amount)}</strong>

              <div className="wallet-type">
                <span style={{ backgroundColor: wallet.color }} />
                {wallet.type}
              </div>
            </article>
          );
        })}
      </section>

      <section className="wallet-summary-card">
        <div>
          <span>Total Balance</span>
          <strong>$2,460.00</strong>
        </div>

        <div className="mini-line-chart">
          <svg viewBox="0 0 240 80" aria-label="Balance growth chart">
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
              d="M0,68 L30,58 L56,62 L82,42 L106,52 L136,31 L164,38 L195,15 L218,23 L240,7 L240,80 L0,80 Z"
            />

            <path
              className="chart-line"
              d="M0,68 L30,58 L56,62 L82,42 L106,52 L136,31 L164,38 L195,15 L218,23 L240,7"
            />
          </svg>
        </div>

        <span className="wallet-growth">
          <TrendUp size={17} weight="bold" />
          12.5% this month
        </span>
      </section>
    </main>
    </div>
  );
}

export default Wallets;