"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";
import { chapters, arcColors, getChapterBySlug } from "../data";
import type { Panel } from "../data";

const GOLD = "#C9A84C";
const BG = "#080603";
const WHITE = "#f0ead8";
const DIM = "#7a6e52";

function PanelView({ panel, pageNum, total }: { panel: Panel; pageNum: number; total: number }) {
  const bgMap = {
    dark: "linear-gradient(160deg, #0c0a05 0%, #080603 100%)",
    void: "linear-gradient(160deg, #050402 0%, #0a0806 100%)",
    light: "linear-gradient(160deg, #181208 0%, #100d06 100%)",
    glow: "linear-gradient(160deg, #100d06 0%, #0c0a04 100%)",
  };
  const bg = bgMap[panel.bg ?? "dark"];
  const isVoid = panel.bg === "void";
  const isGlow = panel.bg === "glow";

  return (
    <div style={{
      width: "100%", maxWidth: 680, margin: "0 auto",
      aspectRatio: "2 / 3",
      background: bg,
      border: `1px solid rgba(201,168,76,${isVoid ? 0.06 : isGlow ? 0.2 : 0.1})`,
      borderRadius: 2,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "48px 56px",
    }}>
      {isGlow && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />}
      {isVoid && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />}
      <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12, border: "1px solid rgba(201,168,76,0.04)", pointerEvents: "none", borderRadius: 1 }} />
      <div style={{ position: "absolute", bottom: 20, right: 24, fontSize: 8, letterSpacing: "2px", color: DIM, opacity: 0.5 }}>{pageNum} / {total}</div>

      {panel.type === "title" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "5px", color: DIM, marginBottom: 16 }}>ECHO OF THE VOID KING</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 700, color: GOLD, letterSpacing: "3px", lineHeight: 1.3, textShadow: "0 0 40px rgba(201,168,76,0.2)" }}>{panel.text}</h2>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)", margin: "24px auto 0" }} />
        </div>
      )}

      {panel.type === "scene" && (
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 32px" }}>
            {[40, 32, 24, 16].map((r, i) => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, borderRadius: "50%", border: `1px solid rgba(201,168,76,${0.06 + i * 0.04})` }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: isGlow ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)" }} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: WHITE, opacity: 0.7, lineHeight: 1.7 }}>{panel.caption}</p>
        </div>
      )}

      {panel.type === "dialogue" && (
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
            <div style={{ flexShrink: 0, marginTop: 4 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, opacity: 0.7 }} /></div>
            <span style={{ fontSize: 8, letterSpacing: "3px", color: GOLD, opacity: 0.7, paddingTop: 2 }}>{panel.speaker}</span>
          </div>
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "20px 24px", background: "rgba(201,168,76,0.02)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: WHITE, opacity: 0.9, lineHeight: 1.55 }}>"{panel.text}"</p>
          </div>
          {panel.caption && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: "italic", color: DIM, marginTop: 16, lineHeight: 1.6 }}>{panel.caption}</p>}
        </div>
      )}

      {panel.type === "silence" && (
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 32px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.15)", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 4, height: 4, marginLeft: -2, marginTop: -2, borderRadius: "50%", background: "rgba(201,168,76,0.3)" }} />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: WHITE, opacity: 0.6, lineHeight: 1.75 }}>{panel.caption}</p>
        </div>
      )}

      {panel.type === "transition" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ height: 1, width: 120, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 auto 28px" }} />
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "8px", color: GOLD, opacity: 0.8 }}>{panel.text}</p>
          <div style={{ height: 1, width: 120, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "28px auto 0" }} />
        </div>
      )}
    </div>
  );
}

export default function ChapterReaderClient({ slug }: { slug: string }) {
  const chapter = getChapterBySlug(slug);
  const [page, setPage] = useState(0);

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => {
    if (!chapter) return;
    setPage((p) => Math.min(chapter.pages.length - 1, p + 1));
  }, [chapter]);

  useEffect(() => { setPage(0); }, [slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!chapter) {
    return (
      <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: DIM, marginBottom: 16 }}>Chapter not found.</p>
          <Link href="/read" style={{ color: GOLD, fontSize: 11, letterSpacing: "2px" }}>← BACK TO CHAPTERS</Link>
        </div>
      </div>
    );
  }

  const color = arcColors[chapter.arc];
  const prevChapter = chapters.find((c) => c.index === chapter.index - 1);
  const nextChapter = chapters.find((c) => c.index === chapter.index + 1);
  const isLastPage = page === chapter.pages.length - 1;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: WHITE, fontFamily: "'Inter', sans-serif", userSelect: "none" }}>
      {/* Top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px",
        background: "rgba(8,6,3,0.97)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        backdropFilter: "blur(12px)",
      }}>
        <Link href="/read" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={20} />
          <span style={{ fontSize: 9, letterSpacing: "3px", color: DIM }}>CHAPTERS</span>
        </Link>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 8, letterSpacing: "3px", color, opacity: 0.8 }}>ARC {chapter.arc} · CHAPTER {chapter.number}</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: WHITE, letterSpacing: "1.5px", marginTop: 2 }}>{chapter.title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {chapter.pages.map((_, i) => (
              <button key={i} onClick={() => setPage(i)} style={{
                width: i === page ? 16 : 6, height: 4, borderRadius: 2,
                background: i === page ? GOLD : i < page ? `${color}60` : "rgba(201,168,76,0.15)",
                border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s",
              }} />
            ))}
          </div>
          <span style={{ fontSize: 9, color: DIM, letterSpacing: "1px", minWidth: 32 }}>{page + 1}/{chapter.pages.length}</span>
        </div>
      </div>

      {/* Reader */}
      <div style={{ paddingTop: 56, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 680 }}>
            <PanelView panel={chapter.pages[page]} pageNum={page + 1} total={chapter.pages.length} />
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding: "24px 32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
          {page > 0 ? (
            <button onClick={prev} style={{ background: "none", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, padding: "10px 20px", cursor: "pointer", color: DIM, fontSize: 10, letterSpacing: "2px" }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget).style.color = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget).style.color = DIM; }}
            >← PREV</button>
          ) : prevChapter ? (
            <Link href={`/read/${prevChapter.slug}`} style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, padding: "10px 20px", color: DIM, textDecoration: "none", fontSize: 9, letterSpacing: "2px" }}>← CH. {prevChapter.number}</Link>
          ) : (
            <Link href="/read" style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, padding: "10px 20px", color: DIM, textDecoration: "none", fontSize: 9, letterSpacing: "2px" }}>← ALL CHAPTERS</Link>
          )}

          <span style={{ fontSize: 9, color: DIM, opacity: 0.4, letterSpacing: "1.5px" }}>← → KEYS OR CLICK</span>

          {!isLastPage ? (
            <button onClick={next} style={{ background: GOLD, border: "none", borderRadius: 2, padding: "10px 20px", cursor: "pointer", color: "#000", fontSize: 10, letterSpacing: "2px", fontWeight: 700 }}
              onMouseEnter={(e) => (e.currentTarget).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget).style.opacity = "1"}
            >NEXT →</button>
          ) : nextChapter ? (
            <Link href={`/read/${nextChapter.slug}`} style={{ background: GOLD, borderRadius: 2, padding: "10px 20px", color: "#000", textDecoration: "none", fontSize: 10, letterSpacing: "2px", fontWeight: 700 }}>NEXT CHAPTER →</Link>
          ) : (
            <Link href="/read" style={{ background: GOLD, borderRadius: 2, padding: "10px 20px", color: "#000", textDecoration: "none", fontSize: 10, letterSpacing: "2px", fontWeight: 700 }}>FINISHED — ALL CHAPTERS</Link>
          )}
        </div>
      </div>
    </div>
  );
}
