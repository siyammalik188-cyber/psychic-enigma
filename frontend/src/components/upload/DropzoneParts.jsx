import React from "react";
import { FileArrowUp, FilePdf, ImageSquare, X } from "@phosphor-icons/react";

export const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const MAX_BYTES = 20 * 1024 * 1024;

/** Returns an error message, or null when the file is acceptable. */
export function validateFile(file) {
  if (!file) return "Please choose a file.";
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Please choose a PDF, PNG, JPG or WEBP file.";
  }
  if (file.size > MAX_BYTES) return "That file is larger than 20 MB.";
  return null;
}

export function DropzonePrompt() {
  return (
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
  );
}

export function SelectedFile({ file, busy, onClear }) {
  const Icon = file.type === "application/pdf" ? FilePdf : ImageSquare;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
        <Icon size={30} className="text-sage" />
        <div className="text-left">
          <p
            data-testid="selected-file-name"
            className="font-medium text-ink max-w-[240px] truncate"
          >
            {file.name}
          </p>
          <p className="text-sm text-ink3">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        {!busy && (
          <button
            data-testid="clear-file-button"
            onClick={(event) => {
              event.stopPropagation();
              onClear();
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
  );
}
