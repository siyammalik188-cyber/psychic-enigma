import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  FilePdf,
  Question,
  Warning,
  Compass,
  Flask,
} from "@phosphor-icons/react";
import StatusBadge from "../components/StatusBadge";
import ChatPanel from "../components/ChatPanel";
import { downloadSummaryPdf, fetchAnalysis } from "../api";

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const STATUS_COPY = {
  normal: "Nothing here looks out of range.",
  attention: "A few values are worth reviewing.",
  urgent: "Some values should be discussed soon.",
};

function Analysing({ filename }) {
  return (
    <div data-testid="analysing-state" className="max-w-xl mx-auto py-20 text-center">
      <div className="mx-auto w-20 h-20 rounded-3xl bg-normalBg flex items-center justify-center animate-breathe">
        <FileText size={38} weight="duotone" className="text-sage" />
      </div>
      <h2 className="mt-8 font-display text-3xl sm:text-4xl tracking-tight text-ink">
        Reading your report
      </h2>
      <p className="mt-4 text-ink2 leading-relaxed">
        ClarifyMed is extracting the text from <span className="text-ink">{filename}</span> and
        translating it into plain language. This usually takes 20–40 seconds.
      </p>
      <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-sage animate-grow" />
      </div>
    </div>
  );
}

export default function Results() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [exporting, setExporting] = useState(false);
  const timer = useRef(null);

  const shareWithDoctor = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await downloadSummaryPdf(id, `ClarifyMed-summary-${id.slice(0, 8)}.pdf`);
      toast.success("One-page summary downloaded — ready to share.");
    } catch (err) {
      toast.error("Could not build the PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const load = useCallback(async () => {
    try {
      const { data } = await fetchAnalysis(id);
      setAnalysis(data);
      return data.status;
    } catch (err) {
      if (err?.response?.status === 404) setNotFound(true);
      return "failed";
    }
  }, [id]);

  useEffect(() => {
    let active = true;
    const tick = async () => {
      const status = await load();
      if (active && status === "processing") timer.current = setTimeout(tick, 2500);
    };
    tick();
    return () => {
      active = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [load]);

  if (notFound) {
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

  if (!analysis) {
    return <div className="max-w-6xl mx-auto px-6 py-24 text-ink2">Loading…</div>;
  }

  if (analysis.status === "processing") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Analysing filename={analysis.filename} />
      </div>
    );
  }

  if (analysis.status === "failed" || !analysis.report) {
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
            {analysis.error ||
              "The file may be password-protected, blurry, or not a medical report."}
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

  const r = analysis.report;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <Link
        to="/"
        data-testid="back-link"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink2 transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to upload
      </Link>

      <motion.header
        {...fade}
        transition={{ duration: 0.5 }}
        className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-line pb-8"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-sage">
            {r.document_type || "Medical report"}
          </p>
          <h1
            data-testid="report-headline"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-ink max-w-2xl leading-[1.08]"
          >
            {r.headline || STATUS_COPY[r.overall_status] || "Your report, explained"}
          </h1>
          <p className="mt-4 text-sm text-ink3">
            {analysis.filename} ·{" "}
            {new Date(analysis.created_at).toLocaleString(undefined, {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <StatusBadge status={r.overall_status} testId="overall-status-badge" />
          <button
            data-testid="share-with-doctor-button"
            onClick={shareWithDoctor}
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

      {r.red_flags?.length > 0 && (
        <motion.div
          {...fade}
          transition={{ duration: 0.5, delay: 0.05 }}
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
            {r.red_flags.map((flag, i) => (
              <li key={i} className="leading-relaxed">
                — {flag}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.section
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-testid="summary-card"
            className="rounded-4xl border border-line bg-white p-8 md:p-10 shadow-card"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">
              In plain language
            </h2>
            <div className="mt-6 font-display text-xl sm:text-[26px] leading-[1.55] text-ink space-y-5">
              {(r.patient_summary || "").split(/\n{1,}/).filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.section>

          {r.key_findings?.length > 0 && (
            <motion.section {...fade} transition={{ duration: 0.5, delay: 0.15 }}>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-ink">
                Key findings
              </h2>
              <div
                data-testid="key-findings"
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {r.key_findings.map((f, i) => (
                  <div
                    key={i}
                    data-testid={`finding-card-${i}`}
                    className="rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl tracking-tight text-ink">{f.title}</h3>
                      <StatusBadge status={f.status} />
                    </div>
                    <p className="mt-3 text-sm text-ink2 leading-relaxed">{f.explanation}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {r.lab_values?.length > 0 && (
            <motion.section
              {...fade}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-4xl border border-line bg-white p-6 md:p-8 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <Flask size={20} weight="duotone" className="text-sage" />
                <h2 className="font-display text-2xl tracking-tight text-ink">Your values</h2>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table data-testid="lab-values-table" className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      {["Test", "Result", "Reference range", "Status"].map((h) => (
                        <th
                          key={h}
                          className="pb-4 px-2 font-display text-lg text-ink font-normal whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {r.lab_values.map((v, i) => (
                      <tr
                        key={i}
                        data-testid={`lab-row-${i}`}
                        className="border-b border-line transition-colors hover:bg-canvas/60"
                      >
                        <td className="py-4 px-2">
                          <p className="font-medium text-ink">{v.name}</p>
                          {v.plain_meaning && (
                            <p className="mt-1 text-xs text-ink3 max-w-xs leading-relaxed">
                              {v.plain_meaning}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-2 whitespace-nowrap text-ink">
                          <span className="font-display text-xl">{v.value}</span>{" "}
                          <span className="text-sm text-ink2">{v.unit}</span>
                        </td>
                        <td className="py-4 px-2 text-sm text-ink2 whitespace-nowrap">
                          {v.reference_range || "—"}
                        </td>
                        <td className="py-4 px-2">
                          <StatusBadge status={v.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {r.questions_for_doctor?.length > 0 && (
            <motion.section
              {...fade}
              transition={{ duration: 0.5, delay: 0.25 }}
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
                {r.questions_for_doctor.map((q, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-1 font-display text-lg text-sage">{i + 1}</span>
                    <p className="text-ink leading-relaxed">{q}</p>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {r.next_steps?.length > 0 && (
            <motion.section
              {...fade}
              transition={{ duration: 0.5, delay: 0.3 }}
              data-testid="next-steps"
              className="rounded-4xl border border-line bg-white p-8 shadow-card"
            >
              <div className="flex items-center gap-2.5">
                <Compass size={20} weight="duotone" className="text-sage" />
                <h2 className="font-display text-2xl tracking-tight text-ink">
                  Reasonable next steps
                </h2>
              </div>
              <ul className="mt-5 space-y-3 text-ink2">
                {r.next_steps.map((s, i) => (
                  <li key={i} className="leading-relaxed">
                    — {s}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </div>

        <motion.aside
          {...fade}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-[92px] flex flex-col gap-6">
            <ChatPanel analysisId={analysis.analysis_id} />
            <div className="rounded-3xl border border-clay/40 bg-borderlineBg/70 p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-borderlineText">
                Not medical advice
              </p>
              <p className="mt-3 text-sm text-ink2 leading-relaxed">
                ClarifyMed explains documents; it does not diagnose. Take this summary to your
                clinician rather than acting on it alone.
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
