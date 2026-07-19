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
import { useNavigate } from "react-router-dom";

function SidebarNav() {
    const navigate = useNavigate();
    const sidebarItems: SidebarItem[] = [
      { label: "Dashboard", icon: SquaresFour, active: true, link:'/dashboard' },
      { label: "Statistics", icon: ChartBar ,  link:'/statistics'},
      { label: "Wallets", icon: Wallet ,  link:'/wallet' },
      { label: "Transactions", icon: Receipt,  link:'/transactions' },
      { label: "Profile", icon: User,  link:'/profile' },
    ];
    
     const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
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
    
                return (
                  <button
                    className={`sidebar-item ${
                      item.active ? "sidebar-item-active" : ""
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
    
            <button className="logout-button">
              <SignOut size={20} />
              <span>Logout</span>
            </button>
          </aside></div>
  )
}

export default SidebarNav