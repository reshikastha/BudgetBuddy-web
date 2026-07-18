import React from 'react'
import '../styles/landing.css'
import {

  Vault,
} from "@phosphor-icons/react";

function Navbar() {
  return (
     <header className="navbar">
        <a href="/" className="logo">
          <span className="auth-logo-icon">
            <Vault size={22} weight="fill" />
          </span>
          BudgetBuddy
        </a>

        <div className="nav-actions">
          <a href="/login" className="login-link">
            Login
          </a>

          <a href="/register" className="small-button">
            Let&apos;s Begin
          </a>
        </div>
      </header>
  )
}

export default Navbar