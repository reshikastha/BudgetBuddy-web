import {
  useState,
  type FormEvent,
} from "react";

import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  LockKey,
  User,
  Vault,
} from "@phosphor-icons/react";

import loginSafe from "../assets/images/piggybank.png";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
// import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] =
    useState<boolean>(false);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    const response = await login(email, password);

    setSubmitting(false);

    if (!response.success) {
      setError(
        response.message ?? "Unable to log in.",
      );

      return;
    }

    navigate("/dashboard", {
      replace: true,
    });
  }

  return (
    <main className="auth-page">
       <header className="auth-header">
               <a href="/" className="logo">
                       <span className="auth-logo-icon">
                         <Vault size={22} weight="fill" />
                       </span>
                       BudgetBuddy
              </a>
      
              <p className="header-switch">
                
                Don't have an account?
      
                <Link to= "/login">
                  Login
                </Link>
              </p>
            </header>

             <section className="auth-content">
        <div className="auth-card">
          <div className="auth-information">
            <span className="auth-label">
              Welcome back
            </span>

            <h1>
                  Hey,
                  <br />
                  welcome back
               
            </h1>

            <p>
            
        Log in to track your spending, manage your budget and stay on top of your goals.
            </p>

            <div className="auth-image-wrapper">
              <span className="auth-star star-one">✦</span>
              <span className="auth-star star-two">✦</span>

              <img
                src={loginSafe}
                alt="Purple BudgetBuddy safe"
                
                className="auth-image"
              />
            </div>
          </div>
      <form className="auth-form" onSubmit={handleLogin}>
       

        <label className="auth-field">
           <User size={21} weight="fill" />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </label>

        <label className="auth-field">
           <LockKey size={21} weight="fill" />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                  
                  />

                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>
      
        <button type="submit" disabled={submitting} className="auth-submit">
          {submitting ? "Logging in..." : "Login"}
        </button>

        <p className="form-switch">
          Don&apos;t have an account?{" "}

          <Link to= "/register">
                 "Create an account"
              </Link>
        </p>
      </form>
       </div>
      </section>
    </main>
  );
}

export default Login;