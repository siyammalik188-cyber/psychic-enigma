import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  DropzonePrompt,
  SelectedFile,
  validateFile,
} from "./upload/DropzoneParts";
import { uploadReport } from "../api";
import { PROGRESS_TRANSITION } from "../motion";

const IDLE_CLASSES =
  "bg-white/50 backdrop-blur-sm border-sage/30 hover:bg-white hover:border-sage hover:shadow-lg";
const DRAGGING_CLASSES = "bg-normalBg border-sage shadow-lift";

export default function Uploader({ onCreated }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [context, setContext] = useState("");
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const pick = (candidate) => {
    const error = validateFile(candidate);
    if (error) {
      if (candidate) toast.error(error);
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

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        data-testid="upload-dropzone"
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center text-center min-h-[320px] p-12 md:p-16 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${
          dragging ? DRAGGING_CLASSES : IDLE_CLASSES
        }`}
      >
        <input
          ref={inputRef}
          data-testid="file-input"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(event) => pick(event.target.files?.[0])}
        />

        {file ? (
          <SelectedFile
            file={file}
            busy={busy}
            onClear={() => {
              setFile(null);
              setProgress(0);
            }}
          />
        ) : (
          <DropzonePrompt />
        )}

        {busy && (
          <div className="absolute left-10 right-10 bottom-8">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-sage"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={PROGRESS_TRANSITION}
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
          onChange={(event) => setContext(event.target.value)}
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
