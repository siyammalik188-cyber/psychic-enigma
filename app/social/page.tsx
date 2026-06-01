"use client";

// Social Media Kit — Echo of the Void King
// 11 cards: 1 series announcement + 7 character spotlights + 3 arc story cards
// Screenshot each card at 1× for Instagram-ready export

import Logo from "../components/Logo";

const GOLD = "#C9A84C";
const BG = "#080603";
const WHITE = "#f0ead8";
const DIM = "#7a6e52";

// ─── Character data ───────────────────────────────────────────────────────────
const characters = [
  {
    name: "KAIRU",
    title: "The Void King",
    role: "PROTAGONIST",
    designation: "VOID",
    quote: "The name on the wall — it was mine.",
    description: "No soul-glow. Hunted from birth. Carries half a soul that isn't his — and a name carved into the wall of the forgotten.",
    traits: ["Void Designation", "Scar on right hand", "Dark hooded coat", "Hollow black eyes"],
    arcs: "ALL 3 ARCS",
    accentColor: "#4a3f1a",
    glowColor: "rgba(201,168,76,0.12)",
    dotColor: "rgba(201,168,76,0.15)",
  },
  {
    name: "MIRA",
    title: "The Ghost Girl",
    role: "DEUTERAGONIST",
    designation: "VOID · SOUL-SPLIT",
    quote: "Well. That's extremely weird.",
    description: "Age 17. Semi-transparent — her edges blur at the edges, her clothes slightly out of time. Half her soul lives inside Kairu. She is the warmth he doesn't know he has.",
    traits: ["Translucent form", "Amber soul-glow", "Blurred edges", "Becomes solid by Arc III"],
    arcs: "ARC I–III",
    accentColor: "#5c4a15",
    glowColor: "rgba(201,168,76,0.18)",
    dotColor: "rgba(201,168,76,0.25)",
  },
  {
    name: "SERAPH",
    title: "The Enforcer",
    role: "ALLY",
    designation: "BRIGHT RESONANT",
    quote: "I'm not a weapon. I'm the graveyard.",
    description: "Soul Enforcer turned ally. Blazing soul-glow — brightest of her generation. Soul-construct: massive wings of pure light. She chose conscience over orders.",
    traits: ["Wings of light", "White Enforcer armor", "Analytical mind", "Blazing soul-glow"],
    arcs: "ARC II–III",
    accentColor: "#e6e1be",
    glowColor: "rgba(230,225,190,0.12)",
    dotColor: "rgba(230,225,190,0.3)",
  },
  {
    name: "VAEL",
    title: "The Arch-Resonant",
    role: "ANTAGONIST",
    designation: "ARCH-RESONANT",
    quote: "They called you the Void King.",
    description: "Ancient. Face half-masked. Soul-glow blazes like a small sun — the most powerful resonance in all of Soulmarch. He believed he was building salvation.",
    traits: ["Soul-mask (half face)", "Sun-corona soul-glow", "Ancient robes", "Rarest resonance tier"],
    arcs: "ARC I–III",
    accentColor: "#c9a84c",
    glowColor: "rgba(201,168,76,0.22)",
    dotColor: "rgba(201,168,76,0.4)",
  },
  {
    name: "HESSA",
    title: "The Underground Leader",
    role: "MENTOR",
    designation: "VOID",
    quote: "Suspicious. But good suspicious.",
    description: "60s. Grey-haired. Missing two fingers on her left hand. No soul-glow at all. Led the Undertow underground resistance for 37 years. The city never found her.",
    traits: ["Grey hair", "Missing 2 left fingers", "37-year resistance leader", "No soul-glow"],
    arcs: "ARC II–III",
    accentColor: "#4a4232",
    glowColor: "rgba(201,168,76,0.08)",
    dotColor: "rgba(201,168,76,0.12)",
  },
  {
    name: "SOLA",
    title: "The Traveler",
    role: "GUIDE",
    designation: "FORMER PROJECT NULLPOINT",
    quote: "I'm not running. There's a difference.",
    description: "50s. Worn travelling cloak. Seven glass vials around her neck — each holds a soul fragment she rescued. She made Kairu Void. Then she rescued him. She's still running.",
    traits: ["Travelling cloak", "Seven glass vials", "Sharp calm eyes", "Former Project Nullpoint"],
    arcs: "ARC I–III",
    accentColor: "#3d3520",
    glowColor: "rgba(201,168,76,0.09)",
    dotColor: "rgba(201,168,76,0.18)",
  },
  {
    name: "FEN",
    title: "The Survivor",
    role: "SYMBOL OF HOPE",
    designation: "VOID",
    quote: "Nobody's going to control you.",
    description: "Age 5. Tiny, fierce, brave. Soul flicker barely there — like a candle seen through fog. By Arc III she sits on Hessa's shoulders and is learning to read.",
    traits: ["Age 5", "Barely-there soul flicker", "Fierce survivor eyes", "Learning to read by Arc III"],
    arcs: "ARC III",
    accentColor: "#2a2010",
    glowColor: "rgba(201,168,76,0.07)",
    dotColor: "rgba(201,168,76,0.15)",
  },
];

// ─── Arc data ────────────────────────────────────────────────────────────────
const arcs = [
  {
    number: "I",
    title: "THE GRAVEYARD BOY",
    chapters: "Chapters I — V",
    quote: "In a world that reads your soul — he had none to read.",
    summary: "Kairu lives at the edge of Soulmarch — invisible, Void, erased from every record. He discovers a ghost named Mira haunting the graveyard. She has half a soul. So does he. The city starts hunting.",
    color: "#8a7235",
    accentLight: "rgba(138,114,53,0.15)",
  },
  {
    number: "II",
    title: "THE RESONANCE WAR",
    chapters: "Chapters VI — XI",
    quote: "I'm not a weapon. I'm the graveyard.",
    summary: "Seraph defects from the Enforcers. Vael moves openly — the Arch-Resonant who built this system stepping out of the shadows. The Undertow fights back. Everything the world was built on starts to crack.",
    color: "#C9A84C",
    accentLight: "rgba(201,168,76,0.15)",
  },
  {
    number: "III",
    title: "THE NAME ON THE WALL",
    chapters: "Chapters XII — XV",
    quote: "Some names are carved so deep they outlast the stone.",
    summary: "There is a wall underground. It holds the carved names of every Void-designated person erased from Soulmarch's records. Kairu finds his name there. He finds the others. He becomes what they always called him.",
    color: "#d4823a",
    accentLight: "rgba(212,130,58,0.15)",
  },
];

// ─── Card wrappers ────────────────────────────────────────────────────────────

function CardShell({ children, id, width, height, note }: { children: React.ReactNode; id: string; width: number; height: number; note: string }) {
  return (
    <div style={{ marginBottom: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 10, letterSpacing: "2px", color: DIM }}>{note}</div>
      <div
        id={id}
        style={{
          width,
          height,
          position: "relative",
          overflow: "hidden",
          background: BG,
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Series Announcement Card (1080×1080 → 600×600) ──────────────────────────

function SeriesAnnouncementCard() {
  const W = 600, H = 600;
  const rings = [220, 165, 115, 75, 40];
  const charDots = [
    { angle: 0.3, ring: 0, label: "VAEL", color: "rgba(201,168,76,0.9)", size: 10 },
    { angle: 2.1, ring: 1, label: "SERAPH", color: "rgba(230,225,190,0.8)", size: 8 },
    { angle: 3.8, ring: 2, label: "MIRA", color: "rgba(180,148,60,0.8)", size: 7 },
    { angle: 5.5, ring: 3, label: "FEN", color: "rgba(120,100,55,0.8)", size: 6 },
    { angle: 1.2, ring: 4, label: "HESSA", color: "rgba(70,62,42,0.9)", size: 6 },
    { angle: 4.1, ring: 4, label: "SOLA", color: "rgba(70,62,42,0.9)", size: 6 },
  ];

  return (
    <CardShell id="card-series" width={W} height={H} note="SERIES ANNOUNCEMENT · 1080×1080">
      {/* BG gradients */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 60%)" }} />

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((f, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${f * 100}%`, height: 1, background: "rgba(201,168,76,0.04)" }} />
      ))}

      {/* Top label */}
      <div style={{ position: "absolute", top: 32, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 9, letterSpacing: "4px", color: GOLD, opacity: 0.7 }}>MANGA SERIES · 3 ARCS · 15 CHAPTERS</span>
      </div>

      {/* Resonance diagram — right side */}
      <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)" }}>
        {rings.map((r, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: r * 2, height: r * 2,
            marginLeft: -r, marginTop: -r,
            borderRadius: "50%",
            border: `1px solid rgba(201,168,76,${0.06 + i * 0.04})`,
          }} />
        ))}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 280, height: 280, marginLeft: -140, marginTop: -140, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        {/* Kairu center */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 36, height: 36, marginLeft: -18, marginTop: -18, borderRadius: "50%", background: BG, border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.15)" }} />
        </div>
        {charDots.map((d) => {
          const r = rings[d.ring];
          const cx = Math.cos(d.angle) * r;
          const cy = Math.sin(d.angle) * r;
          return (
            <div key={d.label} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(${cx - d.size / 2}px, ${cy - d.size / 2}px)` }}>
              <div style={{ width: d.size, height: d.size, borderRadius: "50%", background: d.color, boxShadow: `0 0 10px ${d.color}` }} />
            </div>
          );
        })}
      </div>

      {/* Left text */}
      <div style={{ position: "absolute", left: 44, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ width: 2, height: 24, background: GOLD, opacity: 0.6, marginBottom: 20 }} />
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "5px", color: DIM, marginBottom: 4 }}>ECHO OF THE</p>
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 72,
          fontWeight: 800,
          color: GOLD,
          lineHeight: 0.88,
          letterSpacing: "3px",
          textShadow: "0 0 60px rgba(201,168,76,0.3)",
          marginBottom: 24,
        }}>
          VOID<br />KING
        </h1>
        <div style={{ height: 1, width: 200, background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)", marginBottom: 20 }} />
        <p style={{ fontSize: 11, lineHeight: 1.7, color: WHITE, opacity: 0.75, maxWidth: 220 }}>
          In a world that reads your soul —<br />
          <em style={{ color: GOLD, fontStyle: "normal" }}>some are born unreadable.</em>
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 28 }}>
          {[["3", "ARCS"], ["15", "CHAPTERS"], ["7", "CHARACTERS"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: GOLD }}>{n}</div>
              <div style={{ fontSize: 7, letterSpacing: "2px", color: DIM, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ fontSize: 7, letterSpacing: "3px", color: DIM, padding: "5px 14px", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 2 }}>
          SOULMARCH RESONANCE MAP
        </div>
      </div>
    </CardShell>
  );
}

// ─── Character Spotlight Card (1080×1350 → 540×675) ──────────────────────────

function CharacterCard({ char, index }: { char: typeof characters[0]; index: number }) {
  const W = 540, H = 675;
  const isLight = char.name === "SERAPH";
  const numeral = ["I", "II", "III", "IV", "V", "VI", "VII"][index];

  return (
    <CardShell id={`card-char-${char.name.toLowerCase()}`} width={W} height={H} note={`${char.name} CHARACTER SPOTLIGHT · 1080×1350`}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 100% 60% at 50% 0%, ${char.glowColor} 0%, transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 100% 100%, ${char.glowColor.replace("0.12", "0.06")} 0%, transparent 70%)` }} />

      {/* Large ghost numeral */}
      <div style={{
        position: "absolute", bottom: -10, right: -10,
        fontFamily: "'Cinzel', serif",
        fontSize: 260,
        fontWeight: 800,
        color: GOLD,
        opacity: 0.04,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>{numeral}</div>

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${char.accentColor === "#e6e1be" ? "#e6e1be" : GOLD}, transparent)` }} />

      {/* Series label */}
      <div style={{ position: "absolute", top: 24, left: 28, right: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, letterSpacing: "3px", color: GOLD, opacity: 0.6 }}>ECHO OF THE VOID KING</span>
        <span style={{ fontSize: 8, letterSpacing: "2px", color: DIM }}>{char.arcs}</span>
      </div>

      {/* Void circle graphic */}
      <div style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          {[80, 66, 52, 38].map((r, i) => (
            <div key={i} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: r * 2, height: r * 2,
              marginLeft: -r, marginTop: -r,
              borderRadius: "50%",
              border: `1px solid ${char.dotColor}`,
            }} />
          ))}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 48, height: 48,
            marginLeft: -24, marginTop: -24,
            borderRadius: "50%",
            background: BG,
            border: `2px solid ${char.dotColor}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 24px ${char.glowColor}`,
          }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: char.dotColor }} />
          </div>
        </div>
      </div>

      {/* Character name */}
      <div style={{ position: "absolute", top: 240, left: 0, right: 0, textAlign: "center" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "4px", color: DIM, marginBottom: 6 }}>{char.role}</p>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 48,
          fontWeight: 800,
          color: GOLD,
          letterSpacing: "6px",
          lineHeight: 1,
          textShadow: "0 0 40px rgba(201,168,76,0.25)",
        }}>{char.name}</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: WHITE, opacity: 0.55, letterSpacing: "2px", marginTop: 6 }}>{char.title}</p>
      </div>

      {/* Divider */}
      <div style={{ position: "absolute", top: 340, left: 40, right: 40, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />

      {/* Quote */}
      <div style={{ position: "absolute", top: 358, left: 36, right: 36 }}>
        <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 16 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: WHITE, opacity: 0.9, lineHeight: 1.55 }}>
            "{char.quote}"
          </p>
        </div>
      </div>

      {/* Description */}
      <div style={{ position: "absolute", top: 430, left: 36, right: 36 }}>
        <p style={{ fontSize: 11, color: WHITE, opacity: 0.55, lineHeight: 1.65 }}>{char.description}</p>
      </div>

      {/* Traits */}
      <div style={{ position: "absolute", bottom: 52, left: 28, right: 28, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {char.traits.map((t) => (
          <span key={t} style={{
            fontSize: 7, letterSpacing: "1.5px",
            color: DIM, border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 2, padding: "3px 8px",
          }}>{t}</span>
        ))}
        <span style={{
          fontSize: 7, letterSpacing: "1.5px",
          color: GOLD, border: `1px solid rgba(201,168,76,0.4)`,
          borderRadius: 2, padding: "3px 8px",
          background: "rgba(201,168,76,0.06)",
        }}>{char.designation}</span>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 28, borderTop: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 7, letterSpacing: "3px", color: DIM, opacity: 0.6 }}>SOULMARCH · ECHO OF THE VOID KING</span>
      </div>
    </CardShell>
  );
}

// ─── Arc Story Card (1080×1920 → 405×720) ────────────────────────────────────

function ArcStoryCard({ arc }: { arc: typeof arcs[0] }) {
  const W = 405, H = 720;

  return (
    <CardShell id={`card-arc-${arc.number}`} width={W} height={H} note={`ARC ${arc.number} STORY CARD · 1080×1920`}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 100% 50% at 50% 0%, ${arc.accentLight} 0%, transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${arc.accentLight} 0%, transparent 70%)` }} />

      {/* Ghost arc numeral */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 380,
        fontWeight: 700,
        color: arc.color,
        opacity: 0.04,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>{arc.number}</div>

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${arc.color}, transparent)` }} />

      {/* Series label */}
      <div style={{ position: "absolute", top: 28, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 8, letterSpacing: "3px", color: GOLD, opacity: 0.55 }}>ECHO OF THE VOID KING</span>
      </div>

      {/* Arc label */}
      <div style={{ position: "absolute", top: 68, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{
          fontSize: 8, letterSpacing: "3px",
          color: arc.color,
          border: `1px solid ${arc.color}40`,
          padding: "4px 14px", borderRadius: 2,
          background: `${arc.color}10`,
        }}>ARC {arc.number}</div>
        <div style={{ height: 1, width: 60, background: `${arc.color}50` }} />
      </div>

      {/* Arc title */}
      <div style={{ position: "absolute", top: 140, left: 0, right: 0, textAlign: "center", padding: "0 32px" }}>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 28,
          fontWeight: 700,
          color: WHITE,
          letterSpacing: "3px",
          lineHeight: 1.15,
          textShadow: `0 0 30px ${arc.color}50`,
        }}>{arc.title}</h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: DIM, letterSpacing: "2px", marginTop: 8 }}>{arc.chapters}</p>
      </div>

      {/* Quote */}
      <div style={{ position: "absolute", top: 270, left: 24, right: 24 }}>
        <div style={{ borderLeft: `2px solid ${arc.color}`, paddingLeft: 14 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: WHITE, opacity: 0.9, lineHeight: 1.55 }}>
            "{arc.quote}"
          </p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ position: "absolute", top: 380, left: 24, right: 24 }}>
        <p style={{ fontSize: 11, color: WHITE, opacity: 0.5, lineHeight: 1.7 }}>{arc.summary}</p>
      </div>

      {/* Chapter range visual */}
      <div style={{ position: "absolute", bottom: 80, left: 24, right: 24 }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${arc.color}40, transparent)`, marginBottom: 16 }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {arc.chapters.replace("Chapters ", "").split(" — ").flatMap((part, i, arr) => {
            const [start, end] = arr;
            const chNums: string[] = [];
            const roman = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
            const startIdx = roman.indexOf(start);
            const endIdx = roman.indexOf(end);
            for (let j = startIdx; j <= endIdx; j++) chNums.push(roman[j]);
            return i === 0 ? chNums : [];
          }).map((ch) => (
            <div key={ch} style={{
              width: 28, height: 28,
              border: `1px solid ${arc.color}40`,
              borderRadius: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, color: arc.color, letterSpacing: "1px",
              background: `${arc.color}08`,
            }}>{ch}</div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, borderTop: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Logo size={16} />
        <span style={{ fontSize: 7, letterSpacing: "3px", color: DIM, opacity: 0.55, marginLeft: 10 }}>SOULMARCH · ECHO OF THE VOID KING</span>
      </div>
    </CardShell>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SocialKitPage() {
  return (
    <div style={{ background: "#050402", minHeight: "100vh", padding: "64px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 80, padding: "0 48px" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "5px", color: DIM, marginBottom: 12 }}>ECHO OF THE VOID KING</p>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 40, fontWeight: 800, color: GOLD, letterSpacing: "4px", marginBottom: 16 }}>SOCIAL MEDIA KIT</h1>
        <div style={{ height: 1, width: 320, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", margin: "0 auto 20px" }} />
        <p style={{ fontSize: 12, color: WHITE, opacity: 0.5, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
          11 ready-to-post cards — 1 series announcement, 7 character spotlights, 3 arc story cards.<br />
          Right-click any card → Save as image, or use browser screenshot tools.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[["1", "SERIES CARD"], ["7", "CHARACTER CARDS"], ["3", "ARC CARDS"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700, color: GOLD }}>{n}</div>
              <div style={{ fontSize: 8, letterSpacing: "2px", color: DIM, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Series Announcement */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 9, letterSpacing: "4px", color: DIM }}>── SERIES ANNOUNCEMENT ──</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SeriesAnnouncementCard />
      </div>

      {/* Section: Character Spotlights */}
      <div style={{ textAlign: "center", marginBottom: 12, marginTop: 40 }}>
        <span style={{ fontSize: 9, letterSpacing: "4px", color: DIM }}>── CHARACTER SPOTLIGHTS ──</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, padding: "0 40px" }}>
        {characters.map((char, i) => (
          <CharacterCard key={char.name} char={char} index={i} />
        ))}
      </div>

      {/* Section: Arc Story Cards */}
      <div style={{ textAlign: "center", marginBottom: 12, marginTop: 40 }}>
        <span style={{ fontSize: 9, letterSpacing: "4px", color: DIM }}>── ARC STORY CARDS ──</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, padding: "0 40px" }}>
        {arcs.map((arc) => (
          <ArcStoryCard key={arc.number} arc={arc} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{ textAlign: "center", marginTop: 80, paddingBottom: 40 }}>
        <div style={{ height: 1, width: 200, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", margin: "0 auto 20px" }} />
        <p style={{ fontSize: 10, color: DIM, letterSpacing: "2px" }}>ECHO OF THE VOID KING · SOCIAL MEDIA KIT · 11 CARDS</p>
      </div>
    </div>
  );
}
