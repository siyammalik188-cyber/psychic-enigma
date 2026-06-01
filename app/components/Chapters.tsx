type Arc = "I" | "II" | "III";

interface Chapter {
  numeral: string;
  title: string;
  tagline: string;
  arc: Arc;
}

const chapters: Chapter[] = [
  { numeral: "I",    title: "The Boy With No Light",       tagline: "Born unseen, he learns the weight of absence.",          arc: "I"   },
  { numeral: "II",   title: "The Ghost in the Graveyard",  tagline: "A figure lingers where the dead refuse to rest.",         arc: "I"   },
  { numeral: "III",  title: "Half a Soul",                 tagline: "Two halves search for what was severed.",                 arc: "I"   },
  { numeral: "IV",   title: "Running Without a Shadow",    tagline: "To flee the light is to flee oneself.",                   arc: "I"   },
  { numeral: "V",    title: "The Graveyard's Edge",        tagline: "Where the stones end, the silence begins to speak.",      arc: "I"   },
  { numeral: "VI",   title: "Wings of Judgment",           tagline: "The sky descends with verdicts forged in gold.",          arc: "II"  },
  { numeral: "VII",  title: "The Undertow",                tagline: "A current beneath the world pulls him down.",             arc: "II"  },
  { numeral: "VIII", title: "The Arch-Resonant Moves",     tagline: "Something ancient stirs in harmonic depths.",             arc: "II"  },
  { numeral: "IX",   title: "What Nullpoint Built",        tagline: "Architecture of erasure, raised in his name.",            arc: "II"  },
  { numeral: "X",    title: "The War of Glows",            tagline: "Light against light, and the dark watches.",              arc: "II"  },
  { numeral: "XI",   title: "Seraph's Construct",          tagline: "A machine of mercy with merciless edges.",                arc: "II"  },
  { numeral: "XII",  title: "The Wall",                    tagline: "Stone older than memory refuses to yield.",               arc: "III" },
  { numeral: "XIII", title: "Fen's Candle",                tagline: "One small flame held against the void.",                  arc: "III" },
  { numeral: "XIV",  title: "Mira Becomes Real",           tagline: "What was imagined draws its first breath.",               arc: "III" },
  { numeral: "XV",   title: "The Void King's Choice",      tagline: "To reign in silence, or to break the throne.",            arc: "III" },
];

const arcMeta: Record<Arc, { label: string; subtitle: string; color: string }> = {
  I:   { label: "Arc I",   subtitle: "The Graveyard Boy",    color: "#8a7235" },
  II:  { label: "Arc II",  subtitle: "The Resonance War",    color: "#C9A84C" },
  III: { label: "Arc III", subtitle: "The Name on the Wall", color: "#d4823a" },
};

const arcStyles: Record<Arc, { cardBorder: string; badgeBorder: string; badgeText: string }> = {
  I:   { cardBorder: "rgba(138,114,53,0.35)", badgeBorder: "#8a7235",  badgeText: "#a08840"  },
  II:  { cardBorder: "rgba(201,168,76,0.5)",  badgeBorder: "#C9A84C",  badgeText: "#C9A84C"  },
  III: { cardBorder: "rgba(212,130,58,0.4)",  badgeBorder: "#d4823a",  badgeText: "#d4823a"  },
};

function ChapterCard({ numeral, title, tagline, arc }: Chapter) {
  const s = arcStyles[arc];
  return (
    <article
      className="chapter-card"
      style={{ width: 200, height: 280, border: `1px solid ${s.cardBorder}` }}
    >
      <span className="roman-numeral" aria-hidden="true">{numeral}</span>

      <div style={{ position: "relative", zIndex: 10, padding: "20px 20px 0" }}>
        <div style={{
          display: "inline-flex", alignItems: "center",
          paddingLeft: 8, paddingRight: 10, paddingTop: 4, paddingBottom: 4,
          fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase",
          borderLeft: `2px solid ${s.badgeBorder}`, color: s.badgeText,
        }}>
          Arc {arc}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 10, padding: "0 20px 20px", marginTop: "auto" }}>
        <div style={{
          fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#C9A84C", opacity: 0.7, marginBottom: 10, fontWeight: 300,
          marginTop: 60,
        }}>
          Chapter {numeral}
        </div>
        <h3 className="font-cormorant" style={{
          fontSize: 18, lineHeight: 1.2, fontWeight: 600,
          color: "#f0ead8", marginBottom: 8,
        }}>
          {title}
        </h3>
        <p className="font-cormorant" style={{
          fontSize: 11, lineHeight: 1.5, fontWeight: 400,
          color: "rgba(240,234,216,0.4)", fontStyle: "italic",
        }}>
          {tagline}
        </p>
      </div>
    </article>
  );
}

function ArcRow({ arc }: { arc: Arc }) {
  const meta = arcMeta[arc];
  return (
    <section style={{ marginBottom: 56 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 500, color: meta.color }}>
          {meta.label}
        </div>
        <div className="font-cormorant" style={{ fontSize: 14, fontStyle: "italic", color: "rgba(240,234,216,0.45)" }}>
          {meta.subtitle}
        </div>
        <div className="arc-divider" style={{ flex: 1 }} />
      </header>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {chapters.filter(c => c.arc === arc).map(ch => (
          <ChapterCard key={ch.numeral} {...ch} />
        ))}
      </div>
    </section>
  );
}

export default function Chapters() {
  return (
    <section style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE CHAPTERS</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 8 }}>
            15 CHAPTERS
          </h2>
          <p className="font-cormorant" style={{
            fontSize: 18, fontStyle: "italic",
            color: "rgba(240,234,216,0.5)", marginBottom: 20,
          }}>
            Fifteen chapters carved from silence and gold.
          </p>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto" }} />
        </div>

        <ArcRow arc="I" />
        <ArcRow arc="II" />
        <ArcRow arc="III" />

        <footer style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(240,234,216,0.2)" }}>
            — End of Saga —
          </span>
        </footer>
      </div>
    </section>
  );
}
