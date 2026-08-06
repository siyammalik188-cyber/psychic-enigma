import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Chat as ChatIcon } from "@phosphor-icons/react";
import ChatInput from "./chat/ChatInput";
import MessageList from "./chat/MessageList";
import { fetchMessages, streamChat } from "../api";

const SUGGESTIONS = [
  "Which result should I worry about most?",
  "What does this mean in simple terms?",
  "What could cause these numbers?",
];

const SCROLL_OPTIONS = { behavior: "smooth" };

export default function ChatPanel({ analysisId }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchMessages(analysisId)
      .then(({ data }) =>
        setMessages(
          data.items.map((item) => ({ ...item, id: `${item.created_at}-${item.role}` }))
        )
      )
      .catch(() => {});
  }, [analysisId]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, ...SCROLL_OPTIONS });
  }, [messages, streaming]);

  const send = async (text) => {
    const question = (text ?? draft).trim();
    if (!question || streaming) return;
    const stamp = Date.now();
    setDraft("");
    setMessages((prev) => [
      ...prev,
      { id: `local-${stamp}-user`, role: "user", content: question },
      { id: `local-${stamp}-assistant`, role: "assistant", content: "" },
    ]);
    setStreaming(true);
    try {
      await streamChat(analysisId, question, (chunk) => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
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

      <MessageList
        messages={messages}
        suggestions={SUGGESTIONS}
        onSuggestion={send}
        scrollRef={scrollRef}
      />

      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={() => send()}
        disabled={streaming}
      />
    </div>
  );
}
