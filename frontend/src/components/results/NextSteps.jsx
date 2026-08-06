import React from "react";
import { motion } from "framer-motion";
import { Compass } from "@phosphor-icons/react";
import { FADE_UP, TRANSITION } from "../../motion";

export default function NextSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <motion.section
      {...FADE_UP}
      transition={TRANSITION.delay30}
      data-testid="next-steps"
      className="rounded-4xl border border-line bg-white p-8 shadow-card"
    >
      <div className="flex items-center gap-2.5">
        <Compass size={20} weight="duotone" className="text-sage" />
        <h2 className="font-display text-2xl tracking-tight text-ink">Reasonable next steps</h2>
      </div>
      <ul className="mt-5 space-y-3 text-ink2">
        {steps.map((step) => (
          <li key={step} className="leading-relaxed">
            — {step}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
