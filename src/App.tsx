import "./App.css";
import WelcomeGirl from './assets/images/welcome.png'
import { Feature, ContactItem,
  FeatureItem,
  MoneyStep, } from "./types/landing";
import {
  ChartDonut,
  ClipboardText,
  EnvelopeSimple,
  Eye,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  Phone,
  PiggyBank,
  Receipt,
  ShieldCheck,
  SlidersHorizontal,
  Vault,
  Wallet,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const features: Feature[] = [
  {
    icon: "💰",
    title: "Track Expenses",
    description: "Easily track your daily income and expenses.",
    color: "purple",
  },
  {
    icon: "📊",
    title: "Smart Budgets",
    description: "Create budgets that help you spend wisely.",
    color: "green",
  },
  {
    icon: "🛡️",
    title: "Secure & Private",
    description: "Your financial information stays protected.",
    color: "orange",
  },
];

const aboutFeatures: FeatureItem[] = [
  {
    title: "Clarity",
    description: "See where your money goes with clear financial insights.",
    icon: Eye,
  },
  {
    title: "Control",
    description: "Take charge of your finances and stay on track.",
    icon: SlidersHorizontal,
  },
  {
    title: "Confidence",
    description: "Build healthy financial habits and grow your future.",
    icon: ShieldCheck,
  },
];

const moneySteps: MoneyStep[] = [
  {
    number: 1,
    title: "Add Income",
    description: "Add your sources of income to understand your full financial picture.",
    icon: Wallet,
  },
  {
    number: 2,
    title: "Track Expenses",
    description: "Record and categorise your spending to know where your money goes.",
    icon: Receipt,
  },
  {
    number: 3,
    title: "Set a Budget",
    description: "Create a realistic budget that matches your goals and lifestyle.",
    icon: ClipboardText,
  },
  {
    number: 4,
    title: "Grow Savings",
    description: "Save consistently and watch your money grow over time.",
    icon: PiggyBank,
  },
];

const contactDetails: ContactItem[] = [
  {
    title: "Email",
    value: "hello@budgetbuddy.app",
    icon: EnvelopeSimple,
  },
  {
    title: "Phone",
    value: "+61 400 123 456",
    icon: Phone,
  },
  {
    title: "Address",
    value: "Adelaide, South Australia",
    icon: MapPin,
  },
];

function App() {
  return (
    <div className="landing-page">
  
    <Navbar/>
      <main>
        <section className="hero-section" id="about">
          <div className="hero-content">
            <span className="tagline">SMARTER MONEY STARTS HERE</span>

            <h1>
              Take Charge of
              <br />
              Every Dollar
            </h1>

            <p>
              Create smart budgets, track your spending and grow your savings
              with confidence.
            </p>

            <a href="/register" className="primary-button">
              Let&apos;s Begin
              <span>→</span>
            </a>

            <div className="account-message">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="image-glow" />

            <img
              src={WelcomeGirl}
              alt="Woman managing money with a piggy bank"
              className="hero-image"
            />
          </div>
        </section>

        <section className="features-section" id="features">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className={`feature-icon ${feature.color}`}>
                {feature.icon}
              </div>

              <div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </section>

      {/* About section */}

        <section className="about-section" id="about">
          <div className="section-container about-container">
            <div className="about-content">
              <span className="section-label">
                <ChartDonut size={16} weight="bold" />
                About BudgetBuddy
              </span>

              <h2>
                Built to make
                <br />
                money feel simple
              </h2>

              <p className="section-description">
                BudgetBuddy helps you understand your money, make smarter
                choices and build a better financial future—one step at a time.
              </p>

              <div className="about-features">
                {aboutFeatures.map((feature) => {
                  const FeatureIcon = feature.icon;

                  return (
                    <article className="about-card" key={feature.title}>
                      <div className="small-icon">
                        <FeatureIcon size={25} weight="duotone" />
                      </div>

                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>

                      <span className="card-line" />
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="about-visual">
              <div className="chart-card">
                <div className="donut-chart" />

                <div className="chart-labels">
                  <span>
                    <i className="income-dot" />
                    Income
                  </span>

                  <span>
                    <i className="expense-dot" />
                    Expenses
                  </span>

                  <span>
                    <i className="saving-dot" />
                    Savings
                  </span>
                </div>
              </div>

              <div className="safe-illustration">
                <Vault size={190} weight="duotone" />
              </div>

              <div className="coin-stack">
                <span>$</span>
                <span>$</span>
                <span>$</span>
              </div>
            </div>
          </div>
        </section>

        {/* How to manage money */}

        <section className="manage-section" id="how-it-works">
          <div className="section-container">
            <div className="section-heading">
              <span className="section-label">
                <Wallet size={16} weight="bold" />
                How to manage your money
              </span>

              <h2>
                Manage your money in
                <br />
                four simple steps
              </h2>

              <p>
                Follow a straightforward process designed to make managing your
                finances easier.
              </p>
            </div>

            <div className="steps-container">
              <div className="step-line" />

              {moneySteps.map((step) => {
                const StepIcon = step.icon;

                return (
                  <article className="step-wrapper" key={step.number}>
                    <div className="step-number">{step.number}</div>

                    <div className="step-card">
                      <div className="step-icon">
                        <StepIcon size={80} weight="duotone" />
                      </div>

                      <span className="small-green-line" />

                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact section */}

        <section className="contact-section" id="contact">
          <div className="section-container contact-container">
            <div className="contact-information">
              <span className="section-label">
                <EnvelopeSimple size={16} weight="bold" />
                Contact us
              </span>

              <h2>
                Let&apos;s talk about
                <br />
                your goals
              </h2>

              <p className="contact-description">
                Have questions or need help getting started? We&apos;re here for
                you. Reach out and our team will get back to you soon.
              </p>

              <div className="contact-list">
                {contactDetails.map((contact) => {
                  const ContactIcon = contact.icon;

                  return (
                    <article className="contact-item" key={contact.title}>
                      <div className="contact-icon">
                        <ContactIcon size={22} weight="fill" />
                      </div>

                      <div>
                        <h3>{contact.title}</h3>
                        <p>{contact.value}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <form className="contact-form" >
              <label>
                Full Name

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email Address

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </label>

              <label>
                Message

                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={6}
                  required
                />
              </label>

              <button type="submit" className="primary-button">
                <PaperPlaneTilt size={21} weight="fill" />
                Send Message
              </button>
            </form>
          </div>
        </section>

      
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App;