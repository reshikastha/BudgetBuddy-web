import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  LockKey,
  User,
  Vault,
} from "@phosphor-icons/react";

import loginSafe from "../assets/images/piggybank.png";
import registerPiggy from "../assets/images/locker.png";

import "../styles/Auth.css";

type AuthMode = "login" | "register";

type AuthPageProps = {
  mode: AuthMode;
};

type AuthFormData = {
  name: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === "register";

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRegister) {
      setMessage("Your account is ready to be connected to Firebase.");
    } else {
      setMessage("Your login form is ready to be connected to Firebase.");
    }

    console.log(formData);
  }

  return (
    <main className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">
            <Vault size={22} weight="fill" />
          </span>

          <span>BudgetBuddy</span>
        </Link>

        <p className="header-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Login" : "Sign up"}
          </Link>
        </p>
      </header>

      <section className="auth-content">
        <div className="auth-card">
          <div className="auth-information">
            <span className="auth-label">
              {isRegister ? "Start your journey" : "Welcome back"}
            </span>

            <h1>
              {isRegister ? (
                <>
                  Let&apos;s get
                  <br />
                  started
                </>
              ) : (
                <>
                  Hey,
                  <br />
                  welcome back
                </>
              )}
            </h1>

            <p>
              {isRegister
                ? "Create an account to track your expenses, manage your budget and reach your financial goals."
                : "Log in to track your spending, manage your budget and stay on top of your goals."}
            </p>

            <div className="auth-image-wrapper">
              <span className="auth-star star-one">✦</span>
              <span className="auth-star star-two">✦</span>

              <img
                src={isRegister ? registerPiggy : loginSafe}
                alt={
                  isRegister
                    ? "Pink BudgetBuddy piggy bank"
                    : "Purple BudgetBuddy safe"
                }
                className="auth-image"
              />
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="auth-field">
                <User size={21} weight="fill" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  required
                />
              </label>
            )}

            <label className="auth-field">
              <EnvelopeSimple size={21} weight="fill" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
                required
              />
            </label>

            <label className="auth-field">
              <LockKey size={21} weight="fill" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  })
                }
                minLength={6}
                required
              />

              <button
                type="button"
                className="password-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeSlash size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </label>

            {!isRegister && (
              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        rememberMe: event.target.checked,
                      })
                    }
                  />

                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isRegister ? "Create Account" : "Login"}
            </button>

            <p className="form-switch">
              {isRegister
                ? "Already have an account?"
                : "New to BudgetBuddy?"}

              <Link to={isRegister ? "/login" : "/register"}>
                {isRegister ? "Login" : "Create an account"}
              </Link>
            </p>

            <p className="auth-message" aria-live="polite">
              {message}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;