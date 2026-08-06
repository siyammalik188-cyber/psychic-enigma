const arcs = [
  {
    num: "I",
    title: "THE GRAVEYARD BOY",
    chapters: "Chapters I — V",
    desc: "Kairu lives at the edge of Soulmarch — invisible, Void, erased from every record. He discovers a ghost named Mira haunting the graveyard. She has half a soul. So does he. The city starts hunting.",
    quote: "\"In a world that reads your soul — he had none to read.\"",
    color: "rgba(201,168,76,0.12)",
    borderColor: "rgba(201,168,76,0.2)",
    accent: "var(--gold)",
    keyEvents: ["Kairu meets Mira", "Soul-split revealed", "First Enforcer encounter", "The graveyard escape"],
  },
  {
    num: "II",
    title: "THE RESONANCE WAR",
    chapters: "Chapters VI — XI",
    desc: "Seraph defects from the Enforcers. Vael moves openly — the Arch-Resonant who built this system stepping out of the shadows. The Undertow fights back. Everything the world was built on starts to crack.",
    quote: "\"I'm not a weapon. I'm the graveyard.\"",
    color: "rgba(201,168,76,0.06)",
    borderColor: "rgba(230,210,130,0.22)",
    accent: "#e8d882",
    keyEvents: ["Seraph defects", "Vael revealed", "The Undertow rises", "Project Nullpoint exposed"],
  },
  {
    num: "III",
    title: "THE NAME ON THE WALL",
    chapters: "Chapters XII — XV",
    desc: "There is a wall underground. It holds the carved names of every Void-designated person erased from Soulmarch's records. Kairu finds his name there. He finds the others. He becomes what they always called him.",
    quote: "\"Some names are carved so deep they outlast the stone.\"",
    color: "rgba(100,80,30,0.08)",
    borderColor: "rgba(160,135,70,0.2)",
    accent: "#c8a84c",
    keyEvents: ["The wall of names", "Mira becomes solid", "Fen's arc", "Kairu's choice"],
  },
];

export default function Story() {
  return (
    <section id="story" style={{ padding: "120px 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.02) 50%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE STORY</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 20 }}>
            THREE ARCS
          </h2>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            From a graveyard discovery to a world-altering choice — one boy's journey through a city that erased him.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {arcs.map((arc, i) => (
            <div
              key={arc.num}
              className="card-hover"
              style={{
                background: "var(--card)",
                border: `1px solid ${arc.borderColor}`,
                borderRadius: 4,
                padding: "40px 48px",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 48,
                alignItems: "start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: arc.color,
                pointerEvents: "none",
              }} />

              {/* Arc number */}
              <div style={{
                fontSize: 80, fontWeight: 800, color: arc.accent,
                opacity: 0.15, lineHeight: 1, letterSpacing: "-2px",
                userSelect: "none", minWidth: 80, textAlign: "center",
                position: "relative", zIndex: 1,
              }}>
                {arc.num}
              </div>

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 10, letterSpacing: "3px", color: arc.accent, opacity: 0.8 }}>
                    ARC {arc.num}
                  </span>
                  <div style={{ height: 1, flex: 1, background: `${arc.borderColor}` }} />
                  <span style={{ fontSize: 10, letterSpacing: "2px", color: "var(--dimmer)" }}>{arc.chapters}</span>
                </div>

                <h3 style={{
                  fontSize: 30, fontWeight: 800, color: "var(--white)",
                  letterSpacing: "1px", marginBottom: 16,
                }}>
                  {arc.title}
                </h3>

                <p style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.75, marginBottom: 20, maxWidth: 600 }}>
                  {arc.desc}
                </p>

                <div style={{
                  borderLeft: `2px solid ${arc.accent}`,
                  paddingLeft: 14, marginBottom: 0,
                  opacity: 0.7,
                }}>
                  <p style={{ fontSize: 13, color: arc.accent, fontStyle: "italic" }}>{arc.quote}</p>
                </div>
              </div>

              {/* Key events */}
              <div style={{ position: "relative", zIndex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 9, letterSpacing: "2px", color: "var(--dimmer)", marginBottom: 12 }}>
                  KEY EVENTS
                </div>
                {arc.keyEvents.map((e, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: arc.accent, opacity: 0.6, flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: "var(--dim)" }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
