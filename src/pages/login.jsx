import { useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Gift,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

const providers = ["Google", "Apple", "Facebook"];

export default function Login({ onLogin }) {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setError("");
    onLogin(role, email.trim());
  }

  function providerLogin(provider) {
    setError("");
    onLogin(role, `${provider.toLowerCase()}@demo.local`);
  }

  return (
    <section className="login-page">
      <div className="login-intro">
        <div className="login-brand">
          <span className="login-mark"><Sparkles size={20} /></span>
          De Chinny Angel Global
        </div>

        <div className="login-copy">
          <span className="eyebrow">A brighter way to shop</span>
          <h1>Everything you love, in one beautiful place.</h1>
          <p className="muted">
            Shop thoughtfully chosen pieces, collect points, and unlock rewards
            made for your everyday glow.
          </p>

          <div className="login-perks">
            <div><Check size={16} /> Earn points with every order</div>
            <div><Check size={16} /> Track orders in one place</div>
            <div><Check size={16} /> Get offers made for you</div>
          </div>
        </div>
      </div>

      <div className="login-card card">
        <div className="login-card-head">
          <div className="login-icon"><Store size={22} /></div>
          <div>
            <span className="eyebrow">Welcome back</span>
            <h2>Sign in to your account</h2>
          </div>
        </div>

        <div className="role-switch" aria-label="Choose account type">
          <button
            type="button"
            className={role === "customer" ? "active" : ""}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            <ShieldCheck size={15} /> Admin
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <div className="input-with-icon">
              <Mail size={17} />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label-row">
              <label htmlFor="login-password">Password</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
            <div className="input-with-icon">
              <LockKeyhole size={17} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn primary login-submit" type="submit">
            Sign in as {role}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="login-divider"><span>or continue with</span></div>

        <div className="provider-grid">
          {providers.map((provider) => (
            <button
              className="provider-button"
              type="button"
              key={provider}
              onClick={() => providerLogin(provider)}
            >
              <span className={`provider-mark ${provider.toLowerCase()}`}>
                {provider === "Google" ? "G" : provider === "Apple" ? "" : "f"}
              </span>
              {provider}
            </button>
          ))}
        </div>

        <p className="login-note">
          <Gift size={15} /> Social sign-in is in demo mode until OAuth credentials are connected.
        </p>
      </div>
    </section>
  );
}