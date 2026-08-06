import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, FilePlus, ClockCounterClockwise } from "@phosphor-icons/react";
import StatusBadge from "../components/StatusBadge";
import { fetchAnalyses } from "../api";

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchAnalyses(200)
      .then(({ data }) => setItems(data.items))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <motion.header {...fade} transition={{ duration: 0.5 }} className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-sage">
          <ClockCounterClockwise size={15} /> My history
        </p>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl tracking-tighter text-ink leading-[1.05]">
          Every report you've had explained.
        </h1>
        <p className="mt-5 text-ink2 leading-relaxed">
          Reopen any past report to read its full summary, values and the questions it suggested for
          your doctor.
        </p>
      </motion.header>

      {items === null ? (
        <p className="mt-14 text-ink2">Loading…</p>
      ) : items.length === 0 ? (
        <motion.div
          {...fade}
          transition={{ duration: 0.5, delay: 0.1 }}
          data-testid="history-page-empty"
          className="mt-14 rounded-4xl border border-line bg-white p-10 md:p-14 shadow-card max-w-2xl"
        >
          <FilePlus size={34} weight="duotone" className="text-sage" />
          <h2 className="mt-5 font-display text-3xl tracking-tight text-ink">
            No reports here yet
          </h2>
          <p className="mt-4 text-ink2 leading-relaxed">
            Once you upload a lab report, it will stay here so you can revisit the plain-language
            explanation any time.
          </p>
          <Link
            to="/"
            data-testid="history-empty-upload-link"
            className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Upload a report
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="mt-12 flex items-center justify-between border-b border-line pb-4">
            <p data-testid="history-count" className="text-sm text-ink2">
              {items.length} report{items.length === 1 ? "" : "s"}
            </p>
            <Link
              to="/"
              data-testid="history-new-upload-link"
              className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-normalText transition-colors hover:bg-normalBg"
            >
              <FilePlus size={15} /> New report
            </Link>
          </div>

          <ul data-testid="history-page-list" className="mt-8 flex flex-col gap-4">
            {items.map((item, i) => (
              <motion.li
                key={item.analysis_id}
                {...fade}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.4) }}
              >
                <button
                  data-testid={`history-page-item-${item.analysis_id}`}
                  onClick={() => navigate(`/report/${item.analysis_id}`)}
                  className="group w-full text-left rounded-3xl border border-line bg-white p-6 md:p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-display text-2xl tracking-tight text-ink">
                          {item.document_type || item.filename}
                        </p>
                        <StatusBadge
                          status={item.status === "complete" ? item.overall_status : item.status}
                          testId={`history-status-${item.analysis_id}`}
                        />
                      </div>

                      <p
                        data-testid={`history-date-${item.analysis_id}`}
                        className="mt-2 text-xs uppercase tracking-[0.16em] font-semibold text-ink3"
                      >
                        {formatDate(item.created_at)}
                      </p>

                      {item.top_finding ? (
                        <div
                          data-testid={`history-top-finding-${item.analysis_id}`}
                          className="mt-4 flex items-start gap-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                          <p className="text-sm text-ink2 leading-relaxed max-w-xl">
                            <span className="font-semibold text-ink">
                              {item.top_finding.title}
                            </span>
                            {item.top_finding.explanation ? " — " : ""}
                            {(item.top_finding.explanation || "").slice(0, 130)}
                            {(item.top_finding.explanation || "").length > 130 ? "…" : ""}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-ink3">
                          {item.status === "processing"
                            ? "Still being analysed…"
                            : item.status === "failed"
                            ? "This document could not be read."
                            : item.headline || "No findings recorded."}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-5 shrink-0">
                      {item.lab_count > 0 && (
                        <div className="text-right">
                          <p className="font-display text-3xl text-ink leading-none">
                            {item.flagged_count}
                            <span className="text-ink3">/{item.lab_count}</span>
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-ink3">
                            flagged values
                          </p>
                        </div>
                      )}
                      <ArrowUpRight
                        size={20}
                        className="text-ink3 transition-all group-hover:text-sage group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
