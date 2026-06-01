"use client";
import Link from "next/link";
import Logo from "../components/Logo";
import { chapters, arcColors } from "./data";

const GOLD = "#C9A84C";
const BG = "#080603";
const CARD = "#0f0d08";
const WHITE = "#f0ead8";
const DIM = "#7a6e52";

const ARC_SUMMARIES: Record<number, string> = {
  1: "Kairu discovers a ghost named Mira, joins the Undertow resistance, and finds his own name carved into the wall of the forgotten.",
  2: "Seraph defects. Vael steps from shadow. The underground war becomes a surface war.",
  3: "The names on the wall. The final reckoning. What a system's architect owes the people it erased.",
};

export default function ReadPage() {
  const arcs = [1, 2, 3] as const;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: WHITE, fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        padding: "48px 80px 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 32, opacity: 0.6 }}>
            <Logo size={18} />
            <span style={{ fontSize: 9, letterSpacing: "3px", color: DIM }}>← ECHO OF THE VOID KING</span>
          </Link>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "6px", color: GOLD, opacity: 0.7, marginBottom: 8 }}>READ THE MANGA</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: WHITE, opacity: 0.8, lineHeight: 1.3, maxWidth: 560 }}>
            3 arcs · 15 chapters · The complete story of Soulmarch
          </p>
        </div>
      </div>

      {/* Arcs */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 80px" }}>
        {arcs.map((arcNum) => {
          const arcChapters = chapters.filter((c) => c.arc === arcNum);
          const color = arcColors[arcNum];
          const arcTitle = arcChapters[0].arcTitle;

          return (
            <div key={arcNum} style={{ marginBottom: 64 }}>
              {/* Arc header */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 8 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 2,
                  border: `1px solid ${color}50`,
                  background: `${color}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color }}>{arcNum}</span>
                </div>
                <div>
                  <div style={{ fontSize: 8, letterSpacing: "3px", color, marginBottom: 4 }}>ARC {arcNum}</div>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: WHITE, letterSpacing: "2px" }}>{arcTitle}</h2>
                </div>
              </div>
              <p style={{ fontSize: 12, color: DIM, lineHeight: 1.7, maxWidth: 560, marginBottom: 24, paddingLeft: 68 }}>{ARC_SUMMARIES[arcNum]}</p>

              {/* Chapter grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {arcChapters.map((ch) => (
                  <Link
                    key={ch.slug}
                    href={`/read/${ch.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={{
                      padding: "20px 20px",
                      border: "1px solid rgba(201,168,76,0.1)",
                      borderRadius: 2,
                      background: CARD,
                      cursor: "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      position: "relative", overflow: "hidden",
                    }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}60`;
                        (e.currentTarget as HTMLDivElement).style.background = "#120f08";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.1)";
                        (e.currentTarget as HTMLDivElement).style.background = CARD;
                      }}
                    >
                      {/* Ghost numeral */}
                      <div style={{
                        position: "absolute", bottom: -8, right: -4,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 80, fontWeight: 700, color, opacity: 0.06,
                        lineHeight: 1, userSelect: "none", pointerEvents: "none",
                      }}>{ch.number}</div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ fontSize: 8, letterSpacing: "2px", color, opacity: 0.8 }}>CHAPTER {ch.number}</span>
                        <span style={{ fontSize: 8, color: DIM }}>{ch.pages.length} PAGES</span>
                      </div>
                      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 600, color: WHITE, letterSpacing: "1.5px", marginBottom: 8, lineHeight: 1.4 }}>{ch.title}</h3>
                      <p style={{ fontSize: 10, color: DIM, lineHeight: 1.65 }}>{ch.tagline}</p>
                      <div style={{ marginTop: 16, fontSize: 9, letterSpacing: "2px", color }}>READ →</div>
                    </div>
                  </Link>
                ))}
              </div>

              {arcNum < 3 && (
                <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)", marginTop: 56 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
