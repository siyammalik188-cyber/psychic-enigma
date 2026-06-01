const characters = [
  {
    name: "KAIRU",
    title: "The Void King",
    designation: "VOID",
    designationColor: "#2a2215",
    glowColor: "transparent",
    borderColor: "rgba(201,168,76,0.15)",
    description: "No soul-glow. Hunted by Enforcers from birth. Carries half a soul that isn't his — and a name carved into the wall of the forgotten.",
    traits: ["Void designation", "Scar on right hand", "Hollow black eyes", "Dark hooded coat"],
    arc: "All 3 Arcs",
    quote: "\"The name on the wall — it was mine.\"",
    role: "PROTAGONIST",
  },
  {
    name: "MIRA",
    title: "The Ghost Girl",
    designation: "VOID · SOUL-SPLIT",
    designationColor: "#2a1f08",
    glowColor: "rgba(201,168,76,0.08)",
    borderColor: "rgba(201,168,76,0.2)",
    description: "Age 17. Semi-transparent — her edges blur at the edges, her clothes slightly out of time. Half her soul lives inside Kairu. She is the warmth he doesn't know he has.",
    traits: ["Translucent form", "Amber soul-glow", "Blurred edges", "Becomes solid by Arc III"],
    arc: "All 3 Arcs",
    quote: "\"Well. That's extremely weird.\"",
    role: "DEUTERAGONIST",
  },
  {
    name: "SERAPH",
    title: "The Enforcer",
    designation: "BRIGHT RESONANT",
    designationColor: "#1f1a08",
    glowColor: "rgba(230,210,130,0.07)",
    borderColor: "rgba(230,210,130,0.22)",
    description: "Soul Enforcer turned ally. Blazing soul-glow — brightest of her generation. Soul-construct: massive wings of pure light. She chose conscience over orders.",
    traits: ["Wings of light", "White Enforcer armor → civilian", "Analytical mind", "Blazing soul-glow"],
    arc: "Arc II–III",
    quote: "\"I'm not a weapon. I'm the graveyard.\"",
    role: "ALLY",
  },
  {
    name: "VAEL",
    title: "The Arch-Resonant",
    designation: "ARCH-RESONANT",
    designationColor: "#2a1c00",
    glowColor: "rgba(201,168,76,0.1)",
    borderColor: "rgba(201,168,76,0.35)",
    description: "Ancient. Face half-masked. Soul-glow blazes like a small sun — the most powerful resonance in all of Soulmarch. He believed he was building salvation.",
    traits: ["Soul-mask (half face)", "Sun-corona soul-glow", "Ancient robes", "Arch-Resonant — rarest tier"],
    arc: "Arc II–III",
    quote: "\"They called you the Void King.\"",
    role: "ANTAGONIST",
  },
  {
    name: "HESSA",
    title: "The Underground Leader",
    designation: "VOID",
    designationColor: "#181410",
    glowColor: "rgba(100,85,55,0.05)",
    borderColor: "rgba(130,110,70,0.2)",
    description: "60s. Grey-haired. Missing two fingers on her left hand. No soul-glow at all. Led the Undertow underground resistance for 37 years. The city never found her.",
    traits: ["Grey hair", "Missing 2 left fingers", "Void designation", "37-year resistance leader"],
    arc: "Arc II–III",
    quote: "\"Suspicious. But good suspicious.\"",
    role: "MENTOR",
  },
  {
    name: "SOLA",
    title: "The Traveler",
    designation: "VOID",
    designationColor: "#181410",
    glowColor: "rgba(80,70,45,0.05)",
    borderColor: "rgba(120,100,60,0.18)",
    description: "50s. Worn travelling cloak. Seven glass vials around her neck — each holds a soul fragment she rescued. She made Kairu Void. Then she rescued him. She's still running.",
    traits: ["Seven glass vials", "Travelling cloak", "Sharp calm eyes", "Former Project Nullpoint"],
    arc: "Arc I–III",
    quote: "\"I'm not running. There's a difference.\"",
    role: "GUIDE",
  },
  {
    name: "FEN",
    title: "The Survivor",
    designation: "VOID",
    designationColor: "#181410",
    glowColor: "rgba(201,168,76,0.04)",
    borderColor: "rgba(150,130,75,0.18)",
    description: "Age 5. Tiny, fierce, brave. Soul flicker barely there — \"like a candle seen through fog.\" By Arc III she sits on Hessa's shoulders and is learning to read.",
    traits: ["Age 5", "Barely-there soul flicker", "Fierce survivor eyes", "Learning to read by Arc III"],
    arc: "Arc III",
    quote: "\"Nobody's going to control you.\"",
    role: "SYMBOL OF HOPE",
  },
];

export default function Characters() {
  return (
    <section
      id="characters"
      style={{ padding: "120px 0", position: "relative" }}
    >
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,168,76,0.025) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE CAST</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 20 }}>
            CHARACTERS
          </h2>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Seven people shaped by a world that judges you by what glows inside you — or what doesn't.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24,
        }}>
          {characters.map((c) => (
            <div
              key={c.name}
              className="card-hover gold-border"
              style={{
                background: "var(--card)",
                borderRadius: 4,
                padding: 28,
                position: "relative",
                overflow: "hidden",
                borderColor: c.borderColor,
                cursor: "default",
              }}
            >
              {/* Glow */}
              {c.glowColor !== "transparent" && (
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 180, height: 180, borderRadius: "50%",
                  background: `radial-gradient(circle, ${c.glowColor} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />
              )}

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{
                    display: "inline-block",
                    background: c.designationColor,
                    border: `1px solid ${c.borderColor}`,
                    borderRadius: 2, padding: "3px 10px",
                    fontSize: 9, letterSpacing: "2px", color: "var(--gold)",
                    marginBottom: 10,
                  }}>
                    {c.designation}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--white)", letterSpacing: "1px", lineHeight: 1 }}>
                    {c.name}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 4, letterSpacing: "1px" }}>{c.title}</p>
                </div>
                <div style={{
                  fontSize: 8, letterSpacing: "1.5px", color: "var(--gold)", opacity: 0.5,
                  border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2,
                  padding: "4px 8px", textAlign: "right", whiteSpace: "nowrap",
                }}>
                  {c.role}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(201,168,76,0.1)", marginBottom: 16 }} />

              {/* Description */}
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.7, marginBottom: 18 }}>
                {c.description}
              </p>

              {/* Traits */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {c.traits.map((t) => (
                  <span key={t} style={{
                    fontSize: 9, letterSpacing: "1px", color: "var(--dim)",
                    background: "rgba(201,168,76,0.05)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 2, padding: "3px 8px",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <div style={{
                borderLeft: "2px solid rgba(201,168,76,0.35)",
                paddingLeft: 12, marginBottom: 14,
              }}>
                <p style={{ fontSize: 12, color: "var(--gold)", opacity: 0.7, fontStyle: "italic", lineHeight: 1.5 }}>
                  {c.quote}
                </p>
              </div>

              {/* Arc badge */}
              <div style={{ fontSize: 9, letterSpacing: "2px", color: "var(--dimmer)" }}>
                APPEARS IN · {c.arc.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
