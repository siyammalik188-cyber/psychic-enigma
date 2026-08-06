import React from "react";
import { motion } from "framer-motion";
import { Warning } from "@phosphor-icons/react";
import { FADE_UP, TRANSITION } from "../../motion";

export default function RedFlags({ flags }) {
  if (!flags?.length) return null;

  return (
    <motion.div
      {...FADE_UP}
      transition={TRANSITION.delay05}
      data-testid="red-flags"
      className="mt-10 rounded-3xl border border-abnormalText/25 bg-abnormalBg/60 p-7"
    >
      <div className="flex items-center gap-2.5">
        <Warning size={20} className="text-abnormalText" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-abnormalText">
          Bring these up promptly
        </h2>
      </div>
      <ul className="mt-4 space-y-2 text-ink2">
        {flags.map((flag) => (
          <li key={flag} className="leading-relaxed">
            — {flag}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
