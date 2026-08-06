import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { PaperPlaneRight, Chat as ChatIcon } from "@phosphor-icons/react";
import { fetchMessages, streamChat } from "../api";

const SUGGESTIONS = [
  "Which result should I worry about most?",
  "What does this mean in simple terms?",
  "What could cause these numbers?",
];

export default function ChatPanel({ analysisId }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchMessages(analysisId)
      .then(({ data }) => setMessages(data.items))
      .catch(() => {});
  }, [analysisId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text) => {
    const question = (text ?? draft).trim();
    if (!question || streaming) return;
    setDraft("");
    setMessages((prev) => [...prev, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      await streamChat(analysisId, question, (chunk) => {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: next[next.length - 1].content + chunk,
          };
          return next;
        });
      });
    } catch (err) {
      toast.error("Could not reach the assistant. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div
      data-testid="chat-panel"
      className="flex flex-col rounded-4xl border border-line bg-white shadow-card overflow-hidden"
    >
      <div className="flex items-center gap-3 border-b border-line px-6 py-5">
        <ChatIcon size={22} weight="duotone" className="text-sage" />
        <div>
          <h3 className="font-display text-xl tracking-tight text-ink">Ask about your report</h3>
          <p className="text-xs text-ink3">Answers are grounded in this document only</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        data-testid="chat-messages"
        className="scroll-quiet flex-1 min-h-[240px] max-h-[440px] overflow-y-auto px-6 py-5 space-y-4"
      >
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-ink2 leading-relaxed">
              Ask anything about the results above — what a value means, what to watch, or how to
              raise it with your doctor.
            </p>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={s}
                data-testid={`chat-suggestion-${i}`}
                onClick={() => send(s)}
                className="block w-full text-left rounded-2xl bg-muted/70 px-4 py-3 text-sm text-normalText transition-colors hover:bg-normalBg"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            data-testid={`chat-message-${m.role}-${i}`}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-ink text-canvas rounded-br-sm"
                  : "bg-canvas border border-line text-ink rounded-bl-sm prose-sage"
              }`}
            >
              {m.role === "user" ? (
                m.content
              ) : m.content ? (
                <Markdown>{m.content}</Markdown>
              ) : (
                <span className="inline-flex gap-1.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe"
                    style={{ animationDelay: "0.6s" }}
                  />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line p-4">
        <div className="flex items-end gap-2 rounded-3xl border border-line bg-canvas px-4 py-2.5 focus-within:border-sage transition-colors">
          <textarea
            data-testid="chat-input"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Type your question…"
            className="flex-1 resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-ink3 outline-none max-h-24"
          />
          <button
            data-testid="chat-send-button"
            onClick={() => send()}
            disabled={streaming || !draft.trim()}
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
    </div>
  );
}
