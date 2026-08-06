import React from "react";

const MAP = {
  normal: { label: "Normal", cls: "bg-normalBg text-normalText" },
  borderline: { label: "Borderline", cls: "bg-borderlineBg text-borderlineText" },
  abnormal: { label: "Out of range", cls: "bg-abnormalBg text-abnormalText" },
  unknown: { label: "Not stated", cls: "bg-muted text-ink2" },
  attention: { label: "Worth reviewing", cls: "bg-borderlineBg text-borderlineText" },
  urgent: { label: "Discuss soon", cls: "bg-abnormalBg text-abnormalText" },
  processing: { label: "Analysing", cls: "bg-muted text-ink2" },
  complete: { label: "Ready", cls: "bg-normalBg text-normalText" },
  failed: { label: "Failed", cls: "bg-abnormalBg text-abnormalText" },
};

export default function StatusBadge({ status, testId }) {
  const item = MAP[status] || MAP.unknown;
  return (
    <span
      data-testid={testId}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${item.cls}`}
    >
      {item.label}
    </span>
  );
}
