import React from "react";
import { motion } from "framer-motion";
import { FADE_UP, TRANSITION } from "../../motion";

const toParagraphs = (summary) => (summary || "").split(/\n+/).filter(Boolean);

export default function SummaryCard({ summary }) {
  return (
    <motion.section
      {...FADE_UP}
      transition={TRANSITION.delay10}
      data-testid="summary-card"
      className="rounded-4xl border border-line bg-white p-8 md:p-10 shadow-card"
    >
      <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">
        In plain language
      </h2>
      <div className="mt-6 font-display text-xl sm:text-[26px] leading-[1.55] text-ink space-y-5">
        {toParagraphs(summary).map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
}
