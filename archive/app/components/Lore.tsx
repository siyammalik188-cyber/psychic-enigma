const tiers = [
  { name: "VOID", desc: "No soul-glow. Invisible to all detection. Outcasts — or weapons.", color: "#1a1509", border: "rgba(80,68,38,0.4)", dot: "rgba(80,68,38,0.7)", chars: "Kairu · Hessa · Sola · Fen", width: "8%" },
  { name: "NULL", desc: "Barely perceptible. Citizens in poverty tier.", color: "#1c1709", border: "rgba(100,85,45,0.4)", dot: "rgba(100,85,45,0.7)", chars: "—", width: "18%" },
  { name: "LOW", desc: "Faint glow. Standard lower-class citizens.", color: "#201c0a", border: "rgba(130,110,55,0.4)", dot: "rgba(130,110,55,0.7)", chars: "—", width: "32%" },
  { name: "RESONANT", desc: "Standard glow. Full citizen rights and access.", color: "#241f0b", border: "rgba(160,134,65,0.4)", dot: "rgba(160,134,65,0.8)", chars: "—", width: "55%" },
  { name: "BRIGHT", desc: "Strong glow. Eligible for Enforcer corps.", color: "#2a220c", border: "rgba(201,168,76,0.45)", dot: "rgba(201,168,76,0.85)", chars: "Seraph", width: "75%" },
  { name: "ARCH", desc: "Blazes like a small sun. Near-mythic. One in a generation.", color: "#2e250d", border: "rgba(201,168,76,0.7)", dot: "var(--gold)", chars: "Vael", width: "100%" },
];

const factions = [
  {
    name: "THE ENFORCERS",
    role: "AUTHORITY",
    desc: "Soulmarch's soul-police. They track, identify, and contain Void-designated individuals. Armed with soul-detection equipment. Seraph was one of them — until she wasn't.",
    color: "rgba(201,168,76,0.06)",
    border: "rgba(201,168,76,0.3)",
    accent: "var(--gold)",
  },
  {
    name: "THE UNDERTOW",
    role: "RESISTANCE",
    desc: "An invisible underground network of Void people and allies. Founded by Hessa 37 years ago and never once found by the Enforcers. Hidden in plain sight — because they have no glow to find.",
    color: "rgba(100,85,45,0.05)",
    border: "rgba(130,110,55,0.25)",
    accent: "#a08840",
  },
  {
    name: "PROJECT NULLPOINT",
    role: "CLASSIFIED",
    desc: "A government black program. Its purpose: artificially create Void individuals and study what happens when a soul goes silent. Sola used to work there. Kairu was their subject.",
    color: "rgba(40,30,15,0.5)",
    border: "rgba(80,65,30,0.2)",
    accent: "#6a5628",
  },
];

export default function Lore() {
  return (
    <section id="lore" style={{ padding: "120px 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(201,168,76,0.02) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE WORLD</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 20 }}>
            LORE OF SOULMARCH
          </h2>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            A city built on the belief that your soul determines your worth. Every person glows — or doesn't.
          </p>
        </div>

        {/* Soul-glow spectrum */}
        <div style={{
          background: "var(--card)", border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 4, padding: "40px 40px 36px", marginBottom: 32,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--white)", letterSpacing: "1px" }}>
              THE SOUL-GLOW SPECTRUM
            </h3>
            <span className="section-label">RESONANCE HIERARCHY</span>
          </div>

          {/* Spectrum bar */}
          <div style={{
            height: 10, borderRadius: 5, marginBottom: 20,
            background: "linear-gradient(90deg, #1a1509 0%, #2a1f08 30%, #8a7235 60%, #C9A84C 80%, #f0d870 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }} />

          {/* Tier cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {tiers.map((t) => (
              <div key={t.name} style={{
                background: t.color, border: `1px solid ${t.border}`,
                borderRadius: 3, padding: "14px 12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.dot, letterSpacing: "1.5px" }}>{t.name}</span>
                </div>
                <p style={{ fontSize: 10, color: "var(--dim)", lineHeight: 1.5, marginBottom: 8 }}>{t.desc}</p>
                {t.chars !== "—" && (
                  <p style={{ fontSize: 9, color: "var(--dimmer)", letterSpacing: "0.5px" }}>{t.chars}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Soul-split panel */}
        <div style={{
          background: "var(--card)", border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 4, padding: "40px", marginBottom: 32,
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          gap: 32, alignItems: "center",
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>KAIRU</div>
            <h4 style={{ fontSize: 22, fontWeight: 700, color: "var(--white)", marginBottom: 10 }}>½ Soul — Void Side</h4>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.7 }}>
              The silence. The absence. Walks through Soulmarch undetected — because there is nothing to detect. His half of the soul is the void that swallowed the other half whole.
            </p>
          </div>

          <div style={{ textAlign: "center", padding: "0 16px" }}>
            <div style={{ fontSize: 12, letterSpacing: "3px", color: "var(--dimmer)", marginBottom: 16 }}>THE SOUL-SPLIT</div>
            {/* Visual */}
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 16px" }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.3)",
                background: "radial-gradient(circle at 30% 50%, rgba(8,6,3,0.9) 50%, rgba(201,168,76,0.1) 100%)",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 1, height: 60, background: "rgba(201,168,76,0.4)",
              }} />
            </div>
            <p style={{ fontSize: 11, color: "var(--dimmer)", lineHeight: 1.6, maxWidth: 140, margin: "0 auto" }}>
              One soul.<br/>Two people.<br/>Separated at Project Nullpoint.
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="section-label" style={{ marginBottom: 12, textAlign: "right" }}>MIRA</div>
            <h4 style={{ fontSize: 22, fontWeight: 700, color: "var(--gold)", marginBottom: 10 }}>½ Soul — Resonant Side</h4>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.7 }}>
              The ghost. The warmth. She fades without him nearby. She becomes solid as the story progresses — as the soul slowly heals. She is the part of Kairu that can still feel.
            </p>
          </div>
        </div>

        {/* Factions */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--white)", letterSpacing: "1px", marginBottom: 24 }}>
            FACTIONS
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {factions.map((f) => (
              <div key={f.name} className="card-hover" style={{
                background: "var(--card)",
                border: `1px solid ${f.border}`,
                borderRadius: 4,
                overflow: "hidden",
              }}>
                <div style={{ height: 3, background: f.accent, opacity: 0.7 }} />
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--white)", letterSpacing: "0.5px" }}>{f.name}</h4>
                    <span style={{ fontSize: 8, letterSpacing: "2px", color: f.accent, opacity: 0.6 }}>{f.role}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{
          textAlign: "center", padding: "40px",
          background: "var(--card)",
          border: "1px solid rgba(201,168,76,0.1)", borderRadius: 4,
        }}>
          <p style={{ fontSize: 18, color: "var(--gold)", fontStyle: "italic", opacity: 0.7, lineHeight: 1.7 }}>
            "In Soulmarch, your soul is your identity.<br />
            Lose it — and you become a ghost. Or something worse.<br />
            <span style={{ color: "var(--white)", opacity: 0.9, fontStyle: "normal", fontWeight: 600 }}>
              Or something free.
            </span>"
          </p>
        </div>
      </div>
    </section>
  );
}
