import React from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthCard from "../components/auth/AuthCard";
import { LogoMark } from "../components/Layout";
import { useAuth } from "../AuthContext";
import { FADE_UP, TRANSITION } from "../motion";

export default function Login() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-14">
      <motion.div {...FADE_UP} transition={TRANSITION.hero} className="lg:col-span-6">
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
            CLERIFYMED explains medical documents in everyday language. It does not diagnose and it
            never replaces your clinician.
          </p>
        </div>
      </motion.div>

      <motion.div
        {...FADE_UP}
        transition={TRANSITION.heroDelay12}
        className="lg:col-span-6 lg:pl-6"
      >
        <AuthCard />
      </motion.div>
    </div>
  );
}
