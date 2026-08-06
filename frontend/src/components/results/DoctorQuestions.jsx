import React from "react";
import { motion } from "framer-motion";
import { Question } from "@phosphor-icons/react";
import { FADE_UP, TRANSITION } from "../../motion";

export default function DoctorQuestions({ questions }) {
  if (!questions?.length) return null;

  return (
    <motion.section
      {...FADE_UP}
      transition={TRANSITION.delay25}
      data-testid="doctor-questions"
      className="rounded-4xl border border-line bg-muted/60 p-8 md:p-10"
    >
      <div className="flex items-center gap-2.5">
        <Question size={20} weight="duotone" className="text-sage" />
        <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink">
          Questions to ask your doctor
        </h2>
      </div>
      <ul className="mt-6 space-y-4">
        {questions.map((question, index) => (
          <li key={question} className="flex gap-4">
            <span className="mt-1 font-display text-lg text-sage">{index + 1}</span>
            <p className="text-ink leading-relaxed">{question}</p>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
