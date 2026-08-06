import React from "react";
import { motion } from "framer-motion";
import { FilePdf } from "@phosphor-icons/react";
import StatusBadge from "../StatusBadge";
import { FADE_UP, TRANSITION } from "../../motion";

const DATE_FORMAT = {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
};

const STATUS_COPY = {
  normal: "Nothing here looks out of range.",
  attention: "A few values are worth reviewing.",
  urgent: "Some values should be discussed soon.",
};

export default function ResultsHeader({ analysis, report, exporting, onShare }) {
  return (
    <motion.header
      {...FADE_UP}
      transition={TRANSITION.base}
      className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-line pb-8"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-sage">
          {report.document_type || "Medical report"}
        </p>
        <h1
          data-testid="report-headline"
          className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-ink max-w-2xl leading-[1.08]"
        >
          {report.headline || STATUS_COPY[report.overall_status] || "Your report, explained"}
        </h1>
        <p className="mt-4 text-sm text-ink3">
          {analysis.filename} ·{" "}
          {new Date(analysis.created_at).toLocaleString(undefined, DATE_FORMAT)}
        </p>
      </div>
      <div className="flex flex-col items-start md:items-end gap-4">
        <StatusBadge status={report.overall_status} testId="overall-status-badge" />
        <button
          data-testid="share-with-doctor-button"
          onClick={onShare}
          disabled={exporting}
          className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-45 disabled:hover:translate-y-0"
        >
          <FilePdf size={18} weight="duotone" />
          {exporting ? "Preparing PDF…" : "Share with my doctor"}
        </button>
        <p className="text-xs text-ink3 md:text-right max-w-[210px]">
          One page: summary, flagged values and your questions.
        </p>
      </div>
    </motion.header>
  );
}
