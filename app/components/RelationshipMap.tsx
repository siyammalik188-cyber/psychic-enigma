const nodes = [
  { id: "kairu",  label: "KAIRU",  sub: "The Void King",       x: 500, y: 300, r: 32, color: "#C9A84C", glowOp: 0,    border: "rgba(201,168,76,0.3)" },
  { id: "mira",   label: "MIRA",   sub: "The Ghost Girl",      x: 280, y: 180, r: 24, color: "#C9A84C", glowOp: 0.5,  border: "rgba(201,168,76,0.6)" },
  { id: "seraph", label: "SERAPH", sub: "The Enforcer",        x: 720, y: 180, r: 24, color: "#e8d882", glowOp: 0.5,  border: "rgba(232,216,130,0.6)" },
  { id: "vael",   label: "VAEL",   sub: "The Arch-Resonant",   x: 780, y: 380, r: 26, color: "#C9A84C", glowOp: 0.7,  border: "rgba(201,168,76,0.8)" },
  { id: "hessa",  label: "HESSA",  sub: "The Underground",     x: 280, y: 420, r: 22, color: "#7a6030", glowOp: 0,    border: "rgba(122,96,48,0.5)" },
  { id: "sola",   label: "SOLA",   sub: "The Traveler",        x: 400, y: 520, r: 22, color: "#7a6030", glowOp: 0,    border: "rgba(122,96,48,0.5)" },
  { id: "fen",    label: "FEN",    sub: "The Survivor",        x: 600, y: 500, r: 16, color: "#C9A84C", glowOp: 0.15, border: "rgba(201,168,76,0.3)" },
];

const edges = [
  { from: "kairu",  to: "mira",   label: "Soul-split",         color: "rgba(201,168,76,0.7)",  dash: false },
  { from: "kairu",  to: "seraph", label: "Ally",               color: "rgba(232,216,130,0.4)", dash: false },
  { from: "kairu",  to: "vael",   label: "Antagonist",         color: "rgba(201,168,76,0.3)",  dash: true  },
  { from: "kairu",  to: "sola",   label: "Creator / Rescuer",  color: "rgba(122,96,48,0.5)",   dash: false },
  { from: "kairu",  to: "hessa",  label: "Underground ally",   color: "rgba(122,96,48,0.4)",   dash: false },
  { from: "kairu",  to: "fen",    label: "Protects",           color: "rgba(201,168,76,0.3)",  dash: false },
  { from: "hessa",  to: "fen",    label: "Found family",       color: "rgba(122,96,48,0.6)",   dash: false },
  { from: "hessa",  to: "sola",   label: "Undertow network",   color: "rgba(122,96,48,0.4)",   dash: true  },
  { from: "seraph", to: "vael",   label: "Former orders",      color: "rgba(201,168,76,0.2)",  dash: true  },
  { from: "sola",   to: "vael",   label: "Project Nullpoint",  color: "rgba(80,60,20,0.4)",    dash: true  },
  { from: "mira",   to: "hessa",  label: "Undertow member",    color: "rgba(201,168,76,0.2)",  dash: false },
];

function getNode(id: string) { return nodes.find(n => n.id === id)!; }

export default function RelationshipMap() {
  return (
    <section id="arcs" style={{ padding: "120px 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.02) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ display: "block", marginBottom: 16 }}>THE WEB</span>
          <h2 style={{ fontSize: 52, fontWeight: 800, color: "var(--gold)", letterSpacing: "2px", marginBottom: 20 }}>
            CHARACTER CONNECTIONS
          </h2>
          <div className="divider" style={{ maxWidth: 200, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Everyone in Soulmarch is connected — by soul, by history, by what they did to each other.
          </p>
        </div>

        {/* Map container */}
        <div style={{
          background: "var(--card)",
          border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 4,
          padding: "48px 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <svg
            viewBox="0 0 1000 680"
            style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
          >
            <defs>
              {nodes.map(n => (
                <radialGradient key={n.id} id={`glow-${n.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={n.color} stopOpacity={n.glowOp} />
                  <stop offset="100%" stopColor={n.color} stopOpacity={0} />
                </radialGradient>
              ))}
            </defs>

            {/* Edges */}
            {edges.map((e, i) => {
              const a = getNode(e.from), b = getNode(e.to);
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              return (
                <g key={i}>
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={e.color}
                    strokeWidth={e.dash ? 1 : 1.5}
                    strokeDasharray={e.dash ? "4 4" : "none"}
                  />
                  <text
                    x={mx} y={my - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fill="rgba(122,110,82,0.7)"
                    letterSpacing="1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(n => (
              <g key={n.id}>
                {/* Glow halo */}
                {n.glowOp > 0 && (
                  <circle cx={n.x} cy={n.y} r={n.r * 2.5} fill={`url(#glow-${n.id})`} />
                )}
                {/* Node circle */}
                <circle
                  cx={n.x} cy={n.y} r={n.r}
                  fill="var(--bg)"
                  stroke={n.border}
                  strokeWidth={n.id === "kairu" ? 2 : 1.5}
                />
                {/* Inner void dot */}
                <circle
                  cx={n.x} cy={n.y} r={n.r * 0.35}
                  fill={n.id === "kairu" ? "#0a0805" : n.color}
                  opacity={n.id === "kairu" ? 1 : 0.6}
                />
                {/* Label */}
                <text
                  x={n.x} y={n.y + n.r + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="700"
                  fill={n.color}
                  letterSpacing="2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {n.label}
                </text>
                <text
                  x={n.x} y={n.y + n.r + 28}
                  textAnchor="middle"
                  fontSize={8.5}
                  fill="rgba(122,110,82,0.6)"
                  letterSpacing="1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div style={{
            display: "flex", gap: 28, justifyContent: "center",
            marginTop: 24, paddingTop: 20,
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}>
            {[
              { label: "Soul connection", dash: false, color: "rgba(201,168,76,0.7)" },
              { label: "Alliance", dash: false, color: "rgba(122,96,48,0.5)" },
              { label: "Conflict / history", dash: true, color: "rgba(201,168,76,0.4)" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="28" height="10">
                  <line
                    x1={0} y1={5} x2={28} y2={5}
                    stroke={l.color} strokeWidth={1.5}
                    strokeDasharray={l.dash ? "4 3" : "none"}
                  />
                </svg>
                <span style={{ fontSize: 10, color: "var(--dimmer)", letterSpacing: "1.5px" }}>
                  {l.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
