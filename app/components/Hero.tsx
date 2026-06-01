export default function Hero() {
  const rings = [320, 240, 170, 110, 60];
  const charDots = [
    { ring: 0, angle: 0.3, label: "VAEL", color: "rgba(201,168,76,0.9)", size: 12 },
    { ring: 1, angle: 2.1, label: "SERAPH", color: "rgba(230,225,190,0.85)", size: 10 },
    { ring: 2, angle: 3.8, label: "MIRA", color: "rgba(180,148,60,0.8)", size: 9 },
    { ring: 3, angle: 5.5, label: "FEN", color: "rgba(120,100,55,0.8)", size: 7 },
    { ring: 4, angle: 1.2, label: "HESSA", color: "rgba(70,62,42,0.9)", size: 8 },
    { ring: 4, angle: 4.1, label: "SOLA", color: "rgba(70,62,42,0.9)", size: 8 },
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 64,
      }}
    >
      {/* Background glows */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 60% at 70% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 40% 40% at 20% 70%, rgba(201,168,76,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${i * 12.5}%`, height: 1,
          background: "rgba(201,168,76,0.03)",
          pointerEvents: "none",
        }} />
      ))}

      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 64px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, alignItems: "center", width: "100%",
      }}>
        {/* LEFT — Text */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 2, height: 32, background: "var(--gold)", opacity: 0.7 }} />
            <span className="section-label">MANGA SERIES · 3 ARCS · 15 CHAPTERS</span>
          </div>

          <p className="font-cinzel" style={{ fontSize: 16, color: "var(--dim)", letterSpacing: "6px", marginBottom: 8 }}>
            ECHO OF THE
          </p>
          <h1
            className="glow-gold font-cinzel"
            style={{
              fontSize: "clamp(64px, 8vw, 108px)",
              fontWeight: 800,
              color: "var(--gold)",
              lineHeight: 0.9,
              letterSpacing: "4px",
              marginBottom: 32,
            }}
          >
            VOID<br />KING
          </h1>

          <div className="divider" style={{ marginBottom: 28 }} />

          <p style={{
            fontSize: 20, lineHeight: 1.65, color: "var(--white)",
            opacity: 0.8, maxWidth: 480, marginBottom: 12,
          }}>
            In a world that reads your soul —<br />
            <em style={{ color: "var(--gold)", fontStyle: "normal" }}>some are born unreadable.</em>
          </p>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.7, maxWidth: 460, marginBottom: 44 }}>
            Kairu has no soul-glow. In Soulmarch, that makes him invisible — hunted,
            erased, forgotten. But invisibility is also a weapon.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#story" className="btn-primary">READ THE STORY</a>
            <a href="#characters" className="btn-outline">MEET THE CAST</a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 40, marginTop: 56,
            paddingTop: 32, borderTop: "1px solid rgba(201,168,76,0.15)",
          }}>
            {[["3", "ARCS"], ["15", "CHAPTERS"], ["7", "CHARACTERS"], ["1", "VOID KING"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: "var(--dim)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Resonance diagram */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            className="float"
            style={{ position: "relative", width: 520, height: 520 }}
          >
            {/* Concentric rings */}
            {rings.map((r, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: r * 2, height: r * 2,
                marginLeft: -r, marginTop: -r,
                borderRadius: "50%",
                border: `1px solid rgba(201,168,76,${0.08 + i * 0.04})`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Glow layers */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 280, height: 280, marginLeft: -140, marginTop: -140,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
            }} />
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 140, height: 140, marginLeft: -70, marginTop: -70,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)",
            }} />

            {/* Void center — Kairu */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: 52, height: 52, marginLeft: -26, marginTop: -26,
              borderRadius: "50%",
              background: "var(--bg)",
              border: "1.5px solid rgba(201,168,76,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2,
            }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#04030200", border: "1px solid rgba(201,168,76,0.15)" }} />
            </div>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, 30px)",
              fontSize: 8, letterSpacing: "2px", color: "var(--gold)", opacity: 0.5,
              whiteSpace: "nowrap",
            }}>
              KAIRU · VOID
            </div>

            {/* Character dots */}
            {charDots.map((d) => {
              const r = rings[d.ring];
              const cx = 260 + Math.cos(d.angle) * r;
              const cy = 260 + Math.sin(d.angle) * r;
              return (
                <div key={d.label} style={{ position: "absolute", left: cx - d.size / 2, top: cy - d.size / 2 }}>
                  <div style={{
                    width: d.size, height: d.size, borderRadius: "50%",
                    background: d.color,
                    boxShadow: `0 0 12px ${d.color}`,
                  }} />
                  <div style={{
                    position: "absolute", top: d.size + 4, left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 7, letterSpacing: "1.5px", color: d.color,
                    whiteSpace: "nowrap", opacity: 0.8,
                  }}>
                    {d.label}
                  </div>
                </div>
              );
            })}

            {/* Diagram label */}
            <div style={{
              position: "absolute", bottom: -8, left: "50%",
              transform: "translateX(-50%)",
              fontSize: 8, letterSpacing: "3px", color: "var(--dim)",
              whiteSpace: "nowrap",
              padding: "6px 16px",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 2,
            }}>
              SOULMARCH RESONANCE MAP
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)" }} />
        <span style={{ fontSize: 8, letterSpacing: "3px", color: "var(--dim)" }}>SCROLL</span>
      </div>
    </section>
  );
}
