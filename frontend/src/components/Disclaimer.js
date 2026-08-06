import React from "react";
import { ShieldWarning } from "@phosphor-icons/react";

export default function Disclaimer() {
  return (
    <section
      data-testid="medical-disclaimer"
      className="rounded-4xl border border-clay/40 bg-borderlineBg/70 p-8 md:p-10"
    >
      <div className="flex items-start gap-5">
        <ShieldWarning size={30} className="text-borderlineText shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-borderlineText">
            This is not medical advice
          </p>
          <p className="mt-4 text-ink2 leading-relaxed max-w-2xl">
            CLERIFYMED is an educational tool that translates medical documents into plain language.
            It does not diagnose conditions, prescribe or adjust medication, and it can misread a
            document. Always confirm anything you read here with a licensed clinician, and seek
            urgent care immediately if you feel unwell.
          </p>
          <p className="mt-4 text-sm text-ink3">
            Your uploads are processed to generate your summary. Do not upload documents belonging
            to someone else without their permission.
          </p>
        </div>
      </div>
    </section>
  );
}
