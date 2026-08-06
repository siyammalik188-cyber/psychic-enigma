import React, { useState } from "react";
import { Envelope, Lock, User } from "@phosphor-icons/react";
import AuthField from "./AuthField";
import { useAuth } from "../../AuthContext";
import { formatApiErrorDetail } from "../../api";

// Non-sensitive demo config only — supplied by the environment, never hardcoded.
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL || "";
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD || "";
const HAS_DEMO = Boolean(DEMO_EMAIL && DEMO_PASSWORD);

export default function AuthCard() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isLogin = mode === "login";

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      if (isLogin) await login(email.trim(), password);
      else await register(email.trim(), password, name);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      data-testid="auth-form"
      className="rounded-4xl border border-line bg-white p-8 md:p-10 shadow-card"
    >
      <h2 className="font-display text-3xl tracking-tight text-ink">
        {isLogin ? "Sign in" : "Create your account"}
      </h2>
      <p className="mt-2 text-sm text-ink2">
        {isLogin ? "Welcome back." : "Takes a few seconds — email and a password."}
      </p>

      {!isLogin && (
        <AuthField
          label="First name"
          icon={User}
          testId="name-input"
          value={name}
          onChange={setName}
          placeholder="Priya"
        />
      )}

      <AuthField
        label="Email"
        icon={Envelope}
        testId="email-input"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <AuthField
        label="Password"
        icon={Lock}
        testId="password-input"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={isLogin ? "Your password" : "At least 8 characters"}
        required
        minLength={isLogin ? undefined : 8}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />

      {error && (
        <p
          data-testid="auth-error"
          className="mt-5 rounded-2xl bg-abnormalBg px-4 py-3 text-sm text-abnormalText"
        >
          {error}
        </p>
      )}

      <button
        data-testid="auth-submit-button"
        type="submit"
        disabled={busy}
        className="mt-8 w-full rounded-full bg-ink px-6 py-3.5 font-medium text-canvas transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-40 disabled:hover:translate-y-0"
      >
        {busy ? "Just a moment…" : isLogin ? "Sign in" : "Create account"}
      </button>

      <button
        data-testid="auth-toggle-mode"
        type="button"
        onClick={() => {
          setMode(isLogin ? "register" : "login");
          setError("");
        }}
        className="mt-5 w-full text-sm text-ink2 hover:text-ink transition-colors"
      >
        {isLogin ? (
          <>
            New here? <span className="text-sage font-medium">Create an account</span>
          </>
        ) : (
          <>
            Already have an account? <span className="text-sage font-medium">Sign in</span>
          </>
        )}
      </button>

      {isLogin && HAS_DEMO && (
        <button
          data-testid="use-demo-account-button"
          type="button"
          onClick={() => {
            setEmail(DEMO_EMAIL);
            setPassword(DEMO_PASSWORD);
            setError("");
          }}
          className="mt-6 w-full rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-normalText transition-colors hover:bg-normalBg"
        >
          Fill in the demo account
        </button>
      )}
    </form>
  );
}
