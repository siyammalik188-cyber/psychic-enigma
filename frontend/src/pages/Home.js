import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ClockCounterClockwise } from "@phosphor-icons/react";
import Uploader from "../components/Uploader";
import Disclaimer from "../components/Disclaimer";
import StatusBadge from "../components/StatusBadge";
import { fetchAnalyses } from "../api";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchAnalyses()
      .then(({ data }) => setHistory(data.items))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <motion.div {...fade} transition={{ duration: 0.55 }} className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-sage">
          ClarifyMed · Plain-language lab reports
        </p>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink leading-[1.02]">
          Your lab report,
          <br />
          <span className="italic text-sage">explained like a human wrote it.</span>
        </h1>
        <p className="mt-6 text-lg text-ink2 leading-relaxed max-w-xl">
          Upload a lab report and ClarifyMed reads it back to you in everyday words — what each
          value means, what deserves attention, and exactly what to ask your doctor next.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.section
          {...fade}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="lg:col-span-8 flex flex-col gap-6"
        >
          <Uploader onCreated={(id) => navigate(`/report/${id}`)} />
        </motion.section>

        <motion.aside
          {...fade}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-line lg:pl-12"
        >
          <div className="flex items-center gap-2.5">
            <ClockCounterClockwise size={20} className="text-sage" />
            <h2 className="font-display text-2xl tracking-tight text-ink">Recent reports</h2>
          </div>

          {history.length === 0 ? (
            <p data-testid="history-empty" className="text-sm text-ink2 leading-relaxed">
              Nothing here yet. Your analysed reports will be listed here so you can reopen them
              any time.
            </p>
          ) : (
            <ul data-testid="history-list" className="flex flex-col gap-3">
              {history.map((item) => (
                <li key={item.analysis_id}>
                  <button
                    data-testid={`history-item-${item.analysis_id}`}
                    onClick={() => navigate(`/report/${item.analysis_id}`)}
                    className="group w-full text-left rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-ink truncate">
                        {item.document_type || item.filename}
                      </p>
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0 text-ink3 transition-colors group-hover:text-sage"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-ink3">
                      {new Date(item.created_at).toLocaleString(undefined, {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="mt-3">
                      <StatusBadge
                        status={item.status === "complete" ? item.overall_status : item.status}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="rounded-3xl border border-line bg-muted/60 p-6">
            <h3 className="font-display text-xl tracking-tight text-ink">How it works</h3>
            <ol className="mt-4 space-y-3 text-sm text-ink2">
              {[
                "Upload a PDF or photo of your report.",
                "ClarifyMed reads the text and every value it can find.",
                "You get a plain-language summary plus questions for your doctor.",
                "Ask follow-up questions in the chat on the results page.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-[11px] font-semibold text-canvas">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.aside>
      </div>

      <div className="mt-16">
        <Disclaimer />
      </div>
    </div>
  );
}
