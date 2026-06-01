const chapters = [
  // Arc I
  { num: "I",    arc: 1, title: "The Boy With No Light",         tagline: "Kairu discovers what he is.",               color: "rgba(201,168,76,0.08)" },
  { num: "II",   arc: 1, title: "The Ghost in the Graveyard",    tagline: "He is not alone.",                          color: "rgba(201,168,76,0.06)" },
  { num: "III",  arc: 1, title: "Half a Soul",                   tagline: "The split is revealed.",                    color: "rgba(201,168,76,0.07)" },
  { num: "IV",   arc: 1, title: "Running Without a Shadow",      tagline: "The Enforcers begin the hunt.",             color: "rgba(201,168,76,0.05)" },
  { num: "V",    arc: 1, title: "The Graveyard's Edge",          tagline: "Nowhere left to run.",                      color: "rgba(201,168,76,0.08)" },
  // Arc II
  { num: "VI",   arc: 2, title: "Wings of Judgment",             tagline: "Seraph sees the truth.",                    color: "rgba(232,216,130,0.06)" },
  { num: "VII",  arc: 2, title: "The Undertow",                  tagline: "Hessa opens the door.",                     color: "rgba(201,168,76,0.05)" },
  { num: "VIII", arc: 2, title: "The Arch-Resonant Moves",       tagline: "Vael steps into the open.",                 color: "rgba(201,168,76,0.07)" },
  { num: "IX",   arc: 2, title: "What Nullpoint Built",          tagline: "Sola's secret comes out.",                  color: "rgba(201,168,76,0.06)" },
  { num: "X",    arc: 2, title: "The War of Glows",              tagline: "Light against absence.",                    color: "rgba(232,216,130,0.07)" },
  { num: "XI",   arc: 2, title: "Seraph's Construct",            tagline: "The wings open fully.",                     color: "rgba(201,168,76,0.08)" },
  // Arc III
  { num: "XII",  arc: 3, title: "The Wall",                      tagline: "Hundreds of names. One of them is his.",    color: "rgba(201,168,76,0.07)" },
  { num: "XIII", arc: 3, title: "Fen's Candle",                  tagline: "The smallest soul.",                        color: "rgba(201,168,76,0.05)" },
  { num: "XIV",  arc: 3, title: "Mira Becomes Real",             tagline: "The ghost finds solid ground.",             color: "rgba(201,168,76,0.08)" },
  { num: "XV",   arc: 3, title: "The Void King's Choice",        tagline: "A title — or a declaration.",               color: "rgba(201,168,76,0.09)" },
];

const arcColors: Record<number, string> = {
  1: "rgba(201,168,76,0.6)",
  2: "rgba(232,216,130,0.7)",
  3: "rgba(201,168,76,0.5)",
};
const arcLabels: Record<number, string> = {
  1: "ARC I · THE GRAVEYARD BOY",
  2: "ARC II · THE RESONANCE WAR",
  3: "ARC III · THE NAME ON THE WALL",
};

export default function Chapters() {
  return (
    <section style={{ padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE CHAPTERS</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 20 }}>
            15 CHAPTERS
          </h2>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Every chapter is a step deeper into Soulmarch — and further from everything Kairu thought he knew.
          </p>
        </div>

        {/* Chapters by arc */}
        {[1, 2, 3].map((arc) => (
          <div key={arc} style={{ marginBottom: 48 }}>
            {/* Arc label */}
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
            }}>
              <div style={{ width: 3, height: 24, background: arcColors[arc], borderRadius: 2 }} />
              <span style={{ fontSize: 11, letterSpacing: "3px", color: arcColors[arc] }}>
                {arcLabels[arc]}
              </span>
              <div style={{ flex: 1, height: 1, background: `rgba(201,168,76,0.1)` }} />
            </div>

            {/* Chapter cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}>
              {chapters.filter(c => c.arc === arc).map((ch) => (
                <div
                  key={ch.num}
                  className="card-hover gold-border"
                  style={{
                    background: "var(--card)",
                    borderRadius: 3,
                    padding: "20px 18px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  {/* Background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: ch.color,
                    pointerEvents: "none",
                  }} />

                  {/* Chapter number */}
                  <div style={{
                    fontSize: 28, fontWeight: 800,
                    color: arcColors[arc], opacity: 0.25,
                    lineHeight: 1, marginBottom: 12,
                    letterSpacing: "-1px",
                    position: "relative",
                  }}>
                    {ch.num}
                  </div>

                  {/* Title */}
                  <h4 style={{
                    fontSize: 13, fontWeight: 700,
                    color: "var(--white)", lineHeight: 1.4,
                    marginBottom: 8, position: "relative",
                    letterSpacing: "0.3px",
                  }}>
                    {ch.title}
                  </h4>

                  {/* Tagline */}
                  <p style={{
                    fontSize: 11, color: "var(--dim)",
                    lineHeight: 1.5, position: "relative",
                    fontStyle: "italic",
                  }}>
                    {ch.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
