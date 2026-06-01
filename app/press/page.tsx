"use client";

// Press / Pitch Kit — Echo of the Void King
// Publisher-ready one-pager: world, arcs, cast, audience, contact

import Logo from "../components/Logo";

const GOLD = "#C9A84C";
const BG = "#080603";
const CARD = "#0f0d08";
const WHITE = "#f0ead8";
const DIM = "#7a6e52";
const DIMMER = "#3d3828";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
      <div style={{ width: 2, height: 28, background: GOLD, opacity: 0.6, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "5px", color: GOLD, opacity: 0.8 }}>
        {children}
      </span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)`, margin: "64px 0" }} />;
}

function Tag({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span style={{
      fontSize: 9, letterSpacing: "2px",
      color: gold ? GOLD : DIM,
      border: `1px solid ${gold ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.15)"}`,
      background: gold ? "rgba(201,168,76,0.06)" : "transparent",
      borderRadius: 2, padding: "4px 12px",
      display: "inline-block",
    }}>{children}</span>
  );
}

export default function PressPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: WHITE, fontFamily: "'Inter', sans-serif" }}>

      {/* ── COVER ───────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "96px 80px 80px",
      }}>
        {/* BG glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Ghost numeral */}
        <div style={{
          position: "absolute", top: -40, right: -20,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 480, fontWeight: 700, color: GOLD, opacity: 0.03,
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>∅</div>

        <div style={{ maxWidth: 900, position: "relative" }}>
          {/* Kit label */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <Logo size={28} />
            <span style={{ fontSize: 9, letterSpacing: "4px", color: DIM }}>PITCH & PRESS KIT · 2026</span>
          </div>

          {/* Title block */}
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "6px", color: DIM, marginBottom: 8 }}>
            ECHO OF THE
          </p>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(64px, 8vw, 100px)",
            fontWeight: 800, color: GOLD,
            lineHeight: 0.88, letterSpacing: "4px",
            textShadow: "0 0 80px rgba(201,168,76,0.2)",
            marginBottom: 36,
          }}>
            VOID<br />KING
          </h1>

          <div style={{ height: 1, width: 320, background: `linear-gradient(90deg, rgba(201,168,76,0.4), transparent)`, marginBottom: 32 }} />

          {/* Logline */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, lineHeight: 1.6, color: WHITE, opacity: 0.85, maxWidth: 620, marginBottom: 32 }}>
            In a city where your soul is your identity — one boy has none. Hunted, erased, and
            forgotten, Kairu discovers that invisibility is the most dangerous power of all.
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {["MANGA", "DARK FANTASY", "SOCIAL COMMENTARY", "COMING-OF-AGE", "3 ARCS", "15 CHAPTERS", "7 CHARACTERS"].map(t => (
              <Tag key={t} gold={["MANGA", "DARK FANTASY"].includes(t)}>{t}</Tag>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: 48,
            paddingTop: 32, borderTop: "1px solid rgba(201,168,76,0.12)",
          }}>
            {[
              ["3", "STORY ARCS"],
              ["15", "CHAPTERS"],
              ["7", "CHARACTERS"],
              ["1", "VOID KING"],
              ["86", "PAGES PLANNED"],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 700, color: GOLD, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 8, letterSpacing: "2px", color: DIM, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 80px" }}>

        {/* ── THE WORLD ── */}
        <SectionLabel>THE WORLD</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 0 }}>
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700, color: WHITE, letterSpacing: "2px", marginBottom: 16 }}>
              SOULMARCH
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: WHITE, opacity: 0.65, marginBottom: 20 }}>
              A walled city-state where every person is born with a soul-glow — a visible aura that
              marks their resonance tier. Your glow determines your job, your district, your worth.
              The Enforcers read souls at every checkpoint.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: WHITE, opacity: 0.65 }}>
              Those born without a glow are designated <em style={{ color: GOLD, fontStyle: "normal" }}>Void</em> — erased from
              city records, hunted, and disappeared. They are not criminals. They are simply
              unreadable. In Soulmarch, that is the same thing.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { tier: "ARCH-RESONANT", desc: "Rarest tier. Soul-glow blazes like a sun. Runs the system.", color: "#C9A84C" },
              { tier: "BRIGHT RESONANT", desc: "Enforcers, commanders, city architects.", color: "#d4c070" },
              { tier: "MID RESONANT", desc: "Merchants, scholars, artisans. The majority.", color: "#8a7235" },
              { tier: "LOW RESONANT", desc: "Laborers, outer-district residents.", color: "#5a4e28" },
              { tier: "VOID", desc: "No soul-glow. Erased from all records. Hunted.", color: "#3d3828" },
            ].map(({ tier, desc, color }) => (
              <div key={tier} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 16px",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: 2, background: CARD,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 8px ${color}` }} />
                <div>
                  <div style={{ fontSize: 8, letterSpacing: "2px", color: GOLD, marginBottom: 2 }}>{tier}</div>
                  <div style={{ fontSize: 11, color: DIM }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── THE STORY ── */}
        <SectionLabel>THE STORY</SectionLabel>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: WHITE, opacity: 0.6, maxWidth: 680, marginBottom: 48 }}>
          Three arcs. One boy who shouldn't exist, discovering a resistance that has been
          fighting invisibly for decades — and learning what it costs to be seen.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            {
              num: "I",
              title: "THE GRAVEYARD BOY",
              chapters: "Chapters I — V",
              color: "#8a7235",
              hook: "A boy with no soul meets a ghost with half of one.",
              summary: "Kairu lives at the edge of Soulmarch — invisible, Void, erased from every record. He discovers Mira haunting a graveyard. She has half a soul. So does he. The city starts hunting. Together they find the Undertow resistance — and the wall underground covered in names of the erased.",
            },
            {
              num: "II",
              title: "THE RESONANCE WAR",
              chapters: "Chapters VI — XI",
              color: "#C9A84C",
              hook: "An Enforcer defects. The Arch-Resonant steps from shadow.",
              summary: "Seraph — brightest Enforcer of her generation — chooses conscience over orders and joins the Undertow. Vael, the Arch-Resonant who built Soulmarch's entire soul-caste system, moves openly for the first time. The underground war becomes a surface war. Everything cracks.",
            },
            {
              num: "III",
              title: "THE NAME ON THE WALL",
              chapters: "Chapters XII — XV",
              color: "#d4823a",
              hook: "He finds his name on the wall. He becomes what they always called him.",
              summary: "Kairu finds his own name among the erased. He finds all their names. The final confrontation with Vael isn't a fight about power — it's a question about whether a system built on identity can survive the people it tried to erase. Kairu's answer is carved in stone.",
            },
          ].map((arc) => (
            <div key={arc.num} style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              gap: 0,
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 2, background: CARD, overflow: "hidden",
            }}>
              {/* Arc number column */}
              <div style={{
                background: `linear-gradient(180deg, ${arc.color}18 0%, transparent 100%)`,
                borderRight: `1px solid ${arc.color}30`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "28px 0",
              }}>
                <div style={{ fontSize: 8, letterSpacing: "3px", color: arc.color, opacity: 0.7, marginBottom: 6 }}>ARC</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: arc.color, lineHeight: 1 }}>{arc.num}</div>
              </div>
              {/* Content */}
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 10 }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, color: WHITE, letterSpacing: "2px" }}>{arc.title}</h3>
                  <span style={{ fontSize: 9, color: DIM, letterSpacing: "1.5px" }}>{arc.chapters}</span>
                </div>
                <p style={{ fontSize: 12, color: GOLD, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", marginBottom: 10, opacity: 0.9 }}>"{arc.hook}"</p>
                <p style={{ fontSize: 12, color: WHITE, opacity: 0.5, lineHeight: 1.7 }}>{arc.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── THE CAST ── */}
        <SectionLabel>THE CAST</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {[
            { name: "KAIRU", role: "PROTAGONIST", designation: "VOID", desc: "No soul-glow. Hunted from birth. Carries half a soul that isn't his. The city's worst nightmare: someone they erased who came back.", arcs: "ALL 3" },
            { name: "MIRA", role: "DEUTERAGONIST", designation: "VOID · SOUL-SPLIT", desc: "Age 17. Semi-transparent. Half her soul lives inside Kairu. She is the warmth he doesn't know he has.", arcs: "I–III" },
            { name: "SERAPH", role: "ALLY", designation: "BRIGHT RESONANT", desc: "Brightest Enforcer of her generation. Soul-construct: wings of pure light. She chose conscience over orders.", arcs: "II–III" },
            { name: "VAEL", role: "ANTAGONIST", designation: "ARCH-RESONANT", desc: "Ancient. Face half-masked. Built the soul-caste system. Believes he built salvation. The system's architect facing its void.", arcs: "I–III" },
            { name: "HESSA", role: "MENTOR", designation: "VOID", desc: "60s. Led the Undertow resistance for 37 years. Missing two fingers. No soul-glow, no fear. The city never found her.", arcs: "II–III" },
            { name: "SOLA", role: "GUIDE", designation: "FORMER PROJECT NULLPOINT", desc: "50s. Travelling cloak. Seven glass vials, each holding a rescued soul fragment. She made Kairu Void. Then she rescued him.", arcs: "I–III" },
            { name: "FEN", role: "SYMBOL", designation: "VOID", desc: "Age 5. Soul flicker like a candle through fog. Tiny, fierce, brave. The reason the Undertow keeps fighting.", arcs: "III" },
          ].map((c) => (
            <div key={c.name} style={{
              padding: "20px 20px",
              border: "1px solid rgba(201,168,76,0.1)",
              borderRadius: 2, background: CARD,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: GOLD, letterSpacing: "2px" }}>{c.name}</div>
                  <div style={{ fontSize: 8, letterSpacing: "2px", color: DIM, marginTop: 3 }}>{c.role}</div>
                </div>
                <div style={{ fontSize: 7, letterSpacing: "1px", color: DIM, textAlign: "right", opacity: 0.7 }}>
                  <div>ARC</div>
                  <div style={{ color: GOLD }}>{c.arcs}</div>
                </div>
              </div>
              <div style={{ height: 1, background: "rgba(201,168,76,0.08)", marginBottom: 10 }} />
              <p style={{ fontSize: 11, color: WHITE, opacity: 0.5, lineHeight: 1.65, marginBottom: 10 }}>{c.desc}</p>
              <span style={{
                fontSize: 7, letterSpacing: "1.5px", color: DIM,
                border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, padding: "3px 8px",
              }}>{c.designation}</span>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── THEMES ── */}
        <SectionLabel>THEMES & AUDIENCE</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: WHITE, letterSpacing: "2px", marginBottom: 20 }}>CORE THEMES</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { theme: "IDENTITY & ERASURE", desc: "What does it mean to exist when the state refuses to record you?" },
                { theme: "VISIBILITY AS POWER", desc: "The people Soulmarch erased are the ones who end up rewriting it." },
                { theme: "SYSTEMS & THEIR MAKERS", desc: "Vael built the soul-caste in good faith. That's what makes him dangerous." },
                { theme: "FOUND FAMILY", desc: "The Undertow isn't a resistance. It's the family the city tried to prevent." },
                { theme: "GROWING UP INVISIBLE", desc: "A coming-of-age story for everyone who was told they don't belong." },
              ].map(({ theme, desc }) => (
                <div key={theme} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 2, flexShrink: 0, background: `rgba(201,168,76,0.3)`, borderRadius: 1, marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "2px", color: GOLD, marginBottom: 4 }}>{theme}</div>
                    <div style={{ fontSize: 12, color: DIM, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: WHITE, letterSpacing: "2px", marginBottom: 20 }}>TARGET AUDIENCE</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                { label: "PRIMARY", desc: "Manga readers 14–24 drawn to dark fantasy with grounded characters (Fullmetal Alchemist, Attack on Titan, Jujutsu Kaisen)" },
                { label: "SECONDARY", desc: "YA literary fantasy readers who engage with social commentary through genre fiction" },
                { label: "CROSSOVER", desc: "Readers of dystopian fiction where the world's rules are the antagonist" },
              ].map(({ label, desc }) => (
                <div key={label} style={{ padding: "14px 16px", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 2, background: "#0a0804" }}>
                  <div style={{ fontSize: 8, letterSpacing: "2px", color: GOLD, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 12, color: DIM, lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: WHITE, letterSpacing: "2px", marginBottom: 16 }}>COMPARABLE TITLES</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Fullmetal Alchemist", "Monstress", "Witch Hat Atelier", "Attack on Titan", "Promised Neverland"].map(t => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── SERIES STATUS ── */}
        <SectionLabel>SERIES STATUS</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { label: "STATUS", value: "IN DEVELOPMENT", sub: "Story complete, in production" },
            { label: "FORMAT", value: "MANGA", sub: "Right-to-left, black & white" },
            { label: "ARCS COMPLETE", value: "3 / 3", sub: "Full story arc outline finished" },
            { label: "CHAPTERS PLANNED", value: "15", sub: "Chapters I–XV outlined" },
            { label: "PAGES PLANNED", value: "86+", sub: "Est. 5–6 pages per chapter" },
            { label: "LANGUAGE", value: "ENGLISH", sub: "Original language" },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ padding: "20px", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 2, background: CARD }}>
              <div style={{ fontSize: 8, letterSpacing: "2px", color: DIM, marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: GOLD, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 10, color: DIM, opacity: 0.7 }}>{sub}</div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── CONTACT ── */}
        <SectionLabel>CONTACT</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <Logo size={40} />
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: WHITE, letterSpacing: "2px" }}>ABU SAYEED SIYAM</div>
                <div style={{ fontSize: 10, color: DIM, letterSpacing: "1.5px", marginTop: 4 }}>CREATOR · WRITER · ARTIST</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: WHITE, opacity: 0.55, lineHeight: 1.8, marginBottom: 24 }}>
              Echo of the Void King is an original manga series — world, story, characters, and
              visual language built from the ground up. Available for publishing partnership,
              licensing, and collaboration inquiries.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "EMAIL", value: "siyammalik188@gmail.com" },
                { label: "SERIES SITE", value: "siyammalik188-cyber.github.io/psychic-enigma" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontSize: 8, letterSpacing: "2px", color: DIM, width: 60, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 12, color: GOLD }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "32px", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 2, background: CARD }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: WHITE, opacity: 0.85, lineHeight: 1.6, marginBottom: 20 }}>
              "In a world that reads your soul —<br />
              <span style={{ color: GOLD, fontStyle: "normal" }}>some are born unreadable.</span>"
            </div>
            <div style={{ height: 1, background: "rgba(201,168,76,0.12)", marginBottom: 20 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, textAlign: "center" }}>
              {[["3", "ARCS"], ["15", "CH."], ["7", "CHARS"]].map(([n, l]) => (
                <div key={l} style={{ padding: "12px 0", borderRight: "1px solid rgba(201,168,76,0.08)" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, color: GOLD }}>{n}</div>
                  <div style={{ fontSize: 7, letterSpacing: "2px", color: DIM, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <div style={{
        borderTop: "1px solid rgba(201,168,76,0.1)",
        padding: "28px 80px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={20} />
          <span style={{ fontSize: 9, letterSpacing: "3px", color: DIM }}>ECHO OF THE VOID KING</span>
        </div>
        <span style={{ fontSize: 9, letterSpacing: "2px", color: DIMMER }}>PITCH & PRESS KIT · 2026 · ABU SAYEED SIYAM</span>
      </div>

    </div>
  );
}
