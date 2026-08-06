import React from "react";
import Markdown from "react-markdown";

function TypingDots() {
  return (
    <span className="inline-flex gap-1.5 py-1">
      {[0, 0.3, 0.6].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

export default function MessageList({ messages, suggestions, onSuggestion, scrollRef }) {
  return (
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
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              data-testid={`chat-suggestion-${index}`}
              onClick={() => onSuggestion(suggestion)}
              className="block w-full text-left rounded-2xl bg-muted/70 px-4 py-3 text-sm text-normalText transition-colors hover:bg-normalBg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={message.id}
          data-testid={`chat-message-${message.role}-${index}`}
          className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
        >
          <div
            className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-ink text-canvas rounded-br-sm"
                : "bg-canvas border border-line text-ink rounded-bl-sm prose-sage"
            }`}
          >
            {message.role === "user" ? (
              message.content
            ) : message.content ? (
              <Markdown>{message.content}</Markdown>
            ) : (
              <TypingDots />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
