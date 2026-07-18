import React from 'react'
import '../styles/landing.css'

function Navbar() {
  return (
     <header className="navbar">
        <a href="/" className="logo">
          <span className="logo-icon">◉</span>
          BudgetBuddy
        </a>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
        </nav>

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