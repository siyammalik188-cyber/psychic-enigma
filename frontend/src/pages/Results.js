import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft } from "@phosphor-icons/react";
import ChatPanel from "../components/ChatPanel";
import AnalysingState from "../components/results/AnalysingState";
import DoctorQuestions from "../components/results/DoctorQuestions";
import KeyFindings from "../components/results/KeyFindings";
import LabValuesTable from "../components/results/LabValuesTable";
import NextSteps from "../components/results/NextSteps";
import RedFlags from "../components/results/RedFlags";
import ResultsHeader from "../components/results/ResultsHeader";
import SummaryCard from "../components/results/SummaryCard";
import { FailedState, NotFoundState } from "../components/results/EmptyStates";
import useAnalysis from "../hooks/useAnalysis";
import { downloadSummaryPdf } from "../api";
import { FADE_UP, TRANSITION } from "../motion";

export default function Results() {
  const { id } = useParams();
  const { analysis, notFound } = useAnalysis(id);
  const [exporting, setExporting] = useState(false);

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

  if (notFound) return <NotFoundState />;

  if (!analysis) {
    return <div className="max-w-6xl mx-auto px-6 py-24 text-ink2">Loading…</div>;
  }

  if (analysis.status === "processing") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnalysingState filename={analysis.filename} />
      </div>
    );
  }

  if (analysis.status === "failed" || !analysis.report) {
    return <FailedState error={analysis.error} />;
  }

  const report = analysis.report;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <Link
        to="/"
        data-testid="back-link"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink2 transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to upload
      </Link>

      <ResultsHeader
        analysis={analysis}
        report={report}
        exporting={exporting}
        onShare={shareWithDoctor}
      />

      <RedFlags flags={report.red_flags} />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <SummaryCard summary={report.patient_summary} />
          <KeyFindings findings={report.key_findings} />
          <LabValuesTable values={report.lab_values} />
          <DoctorQuestions questions={report.questions_for_doctor} />
          <NextSteps steps={report.next_steps} />
        </div>

        <motion.aside {...FADE_UP} transition={TRANSITION.delay18} className="lg:col-span-4">
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
