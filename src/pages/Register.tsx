import {
  useState,
  type FormEvent,
} from "react";

import { useNavigate, Link } from "react-router-dom";
import {
EnvelopeSimple,
  Eye,
  EyeSlash,
  LockKey,
  User,
  Vault,
} from "@phosphor-icons/react";

import { useAuth } from "../context/AuthContext";
import registerPiggy from "../assets/images/locker.png";

import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] =
    useState<boolean>(false);

  async function handleRegister(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const response = await register(
      email,
      password,
      name,
    );

    setSubmitting(false);

    if (!response.success) {
      setError(
        response.message ?? "Unable to create account.",
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
          "Already have an account?"
          <Link to="/login">
           "Login" 
          </Link>
        </p>
      </header>

      <section className="auth-content">
        <div className="auth-card">
          <div className="auth-information">
            <span className="auth-label">
            Start your journey
            </span>

            <h1>
             
                  Let&apos;s get
                  <br />
                  started
             
            </h1>

            <p>
              Create an account to track your expenses, manage your budget and reach your financial goals.
            </p>

            <div className="auth-image-wrapper">
              <span className="auth-star star-one">✦</span>
              <span className="auth-star star-two">✦</span>

              <img
                src={registerPiggy}
                alt=
                  "Pink BudgetBuddy piggy bank"
                 
                className="auth-image"
              />
            </div>
          </div>


      <form
        className="auth-form"
        onSubmit={handleRegister}
      >
       
        <label  className="auth-field">
           <User size={21} weight="fill" />

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            autoComplete="name"
            required
          />
        </label>

        <label className="auth-field">
          <EnvelopeSimple size={21} weight="fill" />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            autoComplete="email"
            required
          />
        </label>

        <label className="auth-field">
          <LockKey size={21} weight="fill" />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <label className="auth-field">
          <LockKey size={21} weight="fill" />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}  className="auth-submit">
          {submitting
            ? "Creating account..."
            : "Register"}
        </button>

        <p className="form-switch">
          Already have an account?{" "}

         <Link to= "/login">
               Login
              </Link>
        </p>
      </form>

       </div>
      </section>
    </main>
  );
}

export default Register;