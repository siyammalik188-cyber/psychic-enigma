import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FileArrowUp, FilePdf, ImageSquare, X } from "@phosphor-icons/react";
import { uploadReport } from "../api";

const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function Uploader({ onCreated }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [context, setContext] = useState("");
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const pick = (candidate) => {
    if (!candidate) return;
    if (!ACCEPTED.includes(candidate.type)) {
      toast.error("Please choose a PDF, PNG, JPG or WEBP file.");
      return;
    }
    if (candidate.size > 20 * 1024 * 1024) {
      toast.error("That file is larger than 20 MB.");
      return;
    }
    setFile(candidate);
  };

  const submit = async () => {
    if (!file || busy) return;
    setBusy(true);
    setProgress(0);
    try {
      const { data } = await uploadReport(file, context, setProgress);
      onCreated(data.analysis_id);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        data-testid="upload-dropzone"
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files?.[0]);
        }}
        className={`relative flex flex-col items-center justify-center text-center min-h-[320px] p-12 md:p-16 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${
          dragging
            ? "bg-normalBg border-sage shadow-lift"
            : "bg-white/50 backdrop-blur-sm border-sage/30 hover:bg-white hover:border-sage hover:shadow-lg"
        }`}
      >
        <input
          ref={inputRef}
          data-testid="file-input"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />

        {file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
              {file.type === "application/pdf" ? (
                <FilePdf size={30} className="text-sage" />
              ) : (
                <ImageSquare size={30} className="text-sage" />
              )}
              <div className="text-left">
                <p data-testid="selected-file-name" className="font-medium text-ink max-w-[240px] truncate">
                  {file.name}
                </p>
                <p className="text-sm text-ink3">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {!busy && (
                <button
                  data-testid="clear-file-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setProgress(0);
                  }}
                  className="ml-2 rounded-full p-1.5 text-ink3 hover:bg-muted hover:text-ink transition-colors"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-ink2">
              {busy ? "Uploading your document…" : "Ready. Add context below, then analyse."}
            </p>
          </div>
        ) : (
          <>
            <FileArrowUp size={54} weight="duotone" className="text-sage mb-6" />
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-ink">
              Upload your lab report
            </h3>
            <p className="mt-3 text-ink2 max-w-sm">
              Drag a file here, or click to browse. PDF, PNG, JPG or WEBP up to 20 MB.
            </p>
            <span className="mt-6 inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-normalText">
              Choose a file
            </span>
          </>
        )}

        {busy && (
          <div className="absolute left-10 right-10 bottom-8">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-sage"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.35 }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-card">
        <label
          htmlFor="context"
          className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2"
        >
          Optional context
        </label>
        <p className="mt-3 text-sm text-ink2">
          Age, sex, current symptoms or medication help the summary land closer to your situation.
        </p>
        <textarea
          id="context"
          data-testid="patient-context-input"
          rows={3}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. 34, female, tired for the last two months, taking iron tablets"
          className="mt-4 w-full resize-none rounded-2xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink3 outline-none transition-colors focus:border-sage"
        />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            data-testid="analyse-button"
            onClick={submit}
            disabled={!file || busy}
            className="rounded-full bg-ink px-7 py-3.5 font-medium text-canvas transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >
            {busy ? "Sending…" : "Explain my report"}
          </button>
          <p className="text-sm text-ink3">Takes about 20–40 seconds.</p>
        </div>
      </div>
    </div>
  );
}
