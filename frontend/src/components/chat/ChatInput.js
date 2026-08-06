import React from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-line p-4">
      <div className="flex items-end gap-2 rounded-3xl border border-line bg-canvas px-4 py-2.5 focus-within:border-sage transition-colors">
        <textarea
          data-testid="chat-input"
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question…"
          className="flex-1 resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-ink3 outline-none max-h-24"
        />
        <button
          data-testid="chat-send-button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="mb-0.5 rounded-full bg-ink p-2.5 text-canvas transition-transform hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0"
          aria-label="Send question"
        >
          <PaperPlaneRight size={16} weight="fill" />
        </button>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.18em] font-semibold text-ink3">
        Educational only · not medical advice
      </p>
    </div>
  );
}
