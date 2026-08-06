import React from "react";
import { Link, NavLink } from "react-router-dom";

export function LogoMark({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="#5C715E" />
      <path
        d="M20 7.5c4.2 0 6.9 2.6 6.9 6.2 0 3.1-1.9 5-4.7 6.6-2 1.2-2.8 2-2.8 3.5"
        stroke="#F7F5F0"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M8.5 24.5h5.2l2.4-5.4 3.4 10.2 3-6.5 1.9 3.4h7.1"
        stroke="#F7F5F0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.4" cy="12.2" r="3" fill="#D4A373" />
    </svg>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link
            to="/"
            data-testid="header-logo-link"
            className="flex items-center gap-3 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              <LogoMark />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[26px] font-semibold tracking-tight text-ink">
                ClarifyMed
              </span>
              <span className="block text-[9.5px] uppercase tracking-[0.28em] font-semibold text-ink2 mt-0.5">
                Medical AI Assistant
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/history"
              data-testid="nav-history-link"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-sage" : "text-ink2 hover:text-ink"
                }`
              }
            >
              My history
            </NavLink>
            <span
              data-testid="header-disclaimer-pill"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-line bg-muted/70 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-ink2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-clay" />
              Not medical advice
            </span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line mt-24">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-4 justify-between text-sm text-ink2">
          <p className="flex items-center gap-2">
            <LogoMark size={20} />
            <span className="font-display text-lg text-ink">ClarifyMed</span>
          </p>
          <p className="max-w-md leading-relaxed">
            ClarifyMed helps you read your own medical documents. It does not diagnose, treat, or
            replace a conversation with a licensed clinician.
          </p>
        </div>
      </footer>
    </div>
  );
}
