import React from "react";
import { FileText } from "@phosphor-icons/react";

export default function AnalysingState({ filename }) {
  return (
    <div data-testid="analysing-state" className="max-w-xl mx-auto py-20 text-center">
      <div className="mx-auto w-20 h-20 rounded-3xl bg-normalBg flex items-center justify-center animate-breathe">
        <FileText size={38} weight="duotone" className="text-sage" />
      </div>
      <h2 className="mt-8 font-display text-3xl sm:text-4xl tracking-tight text-ink">
        Reading your report
      </h2>
      <p className="mt-4 text-ink2 leading-relaxed">
        CLERIFYMED is extracting the text from <span className="text-ink">{filename}</span> and
        translating it into plain language. This usually takes 20–40 seconds.
      </p>
      <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-sage animate-grow" />
      </div>
    </div>
  );
}
