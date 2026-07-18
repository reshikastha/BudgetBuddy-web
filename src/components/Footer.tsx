import React from 'react'
import '../styles/landing.css'
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  Vault,
  YoutubeLogo,
} from "@phosphor-icons/react";


function Footer() {
  return (
    
      <footer className="footer">
        <div className="section-container footer-container">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <span>
                <Vault size={28} weight="duotone" />
              </span>

              Budget<strong>Buddy</strong>
            </a>

            <p>
              Simple tools for smarter money decisions and a brighter future.
            </p>
          </div>

          <div className="footer-column">
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">Security</a>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#about">Careers</a>
            <a href="#about">Blog</a>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookie Policy</a>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>

            <div className="social-icons">
              <a href="/" aria-label="Instagram">
                <InstagramLogo size={20} weight="fill" />
              </a>

              <a href="/" aria-label="LinkedIn">
                <LinkedinLogo size={20} weight="fill" />
              </a>

              <a href="/" aria-label="YouTube">
                <YoutubeLogo size={20} weight="fill" />
              </a>

              <a href="/" aria-label="Facebook">
                <FacebookLogo size={20} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} BudgetBuddy. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer