import React,{useState} from 'react';
import {
  ChartBar,
  Gear,
  Money,
  PiggyBank,
  Receipt,
  SignOut,
  SquaresFour,
  User,
  Wallet,
  X,
} from "@phosphor-icons/react";
import type {
  SidebarItem,
} from "../types/dashboard";
import '../styles/dashboard.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function SidebarNav() {
    const navigate = useNavigate();
      const location = useLocation();
  const { logout } = useAuth();

    const sidebarItems: SidebarItem[] = [
      { label: "Dashboard", icon: SquaresFour, active: true, link:'/dashboard' },
      { label: "Statistics", icon: ChartBar ,  link:'/statistics'},
      { label: "Wallets", icon: Wallet ,  link:'/wallet' },
      { label: "Transactions", icon: Receipt,  link:'/transactions' },
      { label: "Profile", icon: User,  link:'/profile' },
    ];
    
     const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
      const [loggingOut, setLoggingOut] =
    useState<boolean>(false);

  const [logoutError, setLogoutError] =
    useState<string>("");

  function handleNavigation(link: string): void {
    navigate(link);
    setSidebarOpen(false);
  }


  async function handleLogout(): Promise<void> {
    const confirmed = window.confirm(
      "Are you sure you want to log out?",
    );

    if (!confirmed) {
      return;
    }

    setLoggingOut(true);
    setLogoutError("");

    const response = await logout();

    setLoggingOut(false);

    if (!response.success) {
      setLogoutError(
        response.message ?? "Unable to log out.",
      );

      return;
    }

    navigate("/login", {
      replace: true,
    });
  }
  return (
    <div>
        {sidebarOpen && (
            <button
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            />
          )}
    
          <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-logo">
              <div className="logo-symbol">
                <Money size={22} weight="fill" />
              </div>
    
              <span>BudgetBuddy</span>
    
              <button
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>
    
            <nav className="sidebar-navigation">
              {sidebarItems.map((item) => {
                const SidebarIcon = item.icon;

             const isActive =
              location.pathname === item.link ||
              location.pathname.startsWith(`${item.link}/`);
                return (
                  <button
                    className={`sidebar-item ${
                            isActive ? "sidebar-item-active" : ""
                    }`}
                    key={item.label}
                    onClick={() => navigate(item.link)}
                  >
                    <SidebarIcon size={19} weight="duotone" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
    
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <SignOut size={20} />

                <span>
                  {loggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
          </aside></div>
  )
}

export default SidebarNav