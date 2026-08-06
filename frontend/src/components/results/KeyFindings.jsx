import React from "react";
import { motion } from "framer-motion";
import StatusBadge from "../StatusBadge";
import { FADE_UP, TRANSITION } from "../../motion";

export default function KeyFindings({ findings }) {
  if (!findings?.length) return null;

  return (
    <motion.section {...FADE_UP} transition={TRANSITION.delay15}>
      <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink">Key findings</h2>
      <div data-testid="key-findings" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {findings.map((finding, index) => (
          <div
            key={finding.title}
            data-testid={`finding-card-${index}`}
            className="rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl tracking-tight text-ink">{finding.title}</h3>
              <StatusBadge status={finding.status} />
            </div>
            <p className="mt-3 text-sm text-ink2 leading-relaxed">{finding.explanation}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
