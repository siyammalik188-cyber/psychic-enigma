"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: scrolled ? "rgba(8,6,3,0.95)" : "rgba(8,6,3,0.6)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <Logo size={32} />
        <span style={{ fontSize: 12, letterSpacing: "3px", color: "var(--gold)", fontWeight: 600 }}>
          ECHO OF THE VOID KING
        </span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {["STORY", "CHARACTERS", "LORE", "ARCS"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontSize: 11, letterSpacing: "2px", color: "var(--dim)",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
          >
            {l}
          </a>
        ))}
        <a
          href="/social"
          style={{
            fontSize: 11, letterSpacing: "2px", color: "var(--dim)",
            textDecoration: "none", transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          SOCIAL KIT
        </a>
        <a
          href="/press"
          style={{
            fontSize: 11, letterSpacing: "2px", color: "var(--dim)",
            textDecoration: "none", transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          PRESS KIT
        </a>
        <a
          href="#characters"
          className="btn-outline"
          style={{ padding: "8px 20px", fontSize: 10 }}
        >
          MEET THE CAST
        </a>
      </div>
    </nav>
  );
}
