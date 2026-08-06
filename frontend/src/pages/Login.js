import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Envelope, Lock, User } from "@phosphor-icons/react";
import { useAuth } from "../AuthContext";
import { formatApiErrorDetail } from "../api";
import { LogoMark } from "../components/Layout";

const DEMO = { email: "demo@clarifymed.app", password: "Clarify123!" };

export default function Login() {
  const { user, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      if (mode === "login") await login(email.trim(), password);
      else await register(email.trim(), password, name);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
      setBusy(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="lg:col-span-6"
      >
        <LogoMark size={44} />
        <h1 className="mt-8 font-display text-4xl sm:text-5xl tracking-tighter text-ink leading-[1.05]">
          Your reports,
          <br />
          <span className="italic text-sage">kept to yourself.</span>
        </h1>
        <p className="mt-6 text-lg text-ink2 leading-relaxed max-w-md">
          Sign in with your email so every report you upload — and the plain-language explanation
          that comes with it — stays in your own private history.
        </p>
        <div className="mt-10 rounded-3xl border border-clay/40 bg-borderlineBg/70 p-6 max-w-md">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-borderlineText">
            Not medical advice
          </p>
          <p className="mt-3 text-sm text-ink2 leading-relaxed">
            ClarifyMed explains medical documents in everyday language. It does not diagnose and it
            never replaces your clinician.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="lg:col-span-6 lg:pl-6"
      >
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
            <label className="mt-8 block">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">
                First name
              </span>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 focus-within:border-sage transition-colors">
                <User size={18} className="text-ink3" />
                <input
                  data-testid="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya"
                  className="w-full bg-transparent text-ink placeholder:text-ink3 outline-none"
                />
              </div>
            </label>
          )}

          <label className="mt-6 block">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">
              Email
            </span>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 focus-within:border-sage transition-colors">
              <Envelope size={18} className="text-ink3" />
              <input
                data-testid="email-input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-ink placeholder:text-ink3 outline-none"
              />
            </div>
          </label>

          <label className="mt-6 block">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">
              Password
            </span>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 focus-within:border-sage transition-colors">
              <Lock size={18} className="text-ink3" />
              <input
                data-testid="password-input"
                type="password"
                required
                minLength={isLogin ? undefined : 8}
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? "Your password" : "At least 8 characters"}
                className="w-full bg-transparent text-ink placeholder:text-ink3 outline-none"
              />
            </div>
          </label>

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

          {isLogin && (
            <button
              data-testid="use-demo-account-button"
              type="button"
              onClick={() => {
                setEmail(DEMO.email);
                setPassword(DEMO.password);
                setError("");
              }}
              className="mt-6 w-full rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-normalText transition-colors hover:bg-normalBg"
            >
              Fill in the demo account
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
}
