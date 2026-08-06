import React from "react";
import { Link } from "react-router-dom";
import { Warning } from "@phosphor-icons/react";

export function NotFoundState() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-center">
      <h2 data-testid="not-found" className="font-display text-4xl tracking-tight text-ink">
        We couldn't find that report
      </h2>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-canvas"
      >
        Upload a new report
      </Link>
    </div>
  );
}

export function FailedState({ error }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div
        data-testid="failed-state"
        className="rounded-4xl border border-abnormalText/25 bg-abnormalBg/60 p-10 max-w-2xl"
      >
        <Warning size={30} className="text-abnormalText" />
        <h2 className="mt-5 font-display text-3xl tracking-tight text-ink">
          We couldn't read this document
        </h2>
        <p className="mt-4 text-ink2 leading-relaxed">
          {error || "The file may be password-protected, blurry, or not a medical report."}
        </p>
        <Link
          to="/"
          data-testid="retry-link"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-transform hover:-translate-y-0.5"
        >
          Try another file
        </Link>
      </div>
    </div>
  );
}
