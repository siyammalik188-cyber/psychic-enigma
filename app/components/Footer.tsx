"use client";
export default function Footer() {
  return (
    <footer style={{
      padding: "64px 0 40px",
      borderTop: "1px solid rgba(201,168,76,0.15)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(201,168,76,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 64, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                border: "1.5px solid rgba(201,168,76,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bg)", border: "1px solid rgba(201,168,76,0.2)" }} />
              </div>
              <span style={{ fontSize: 11, letterSpacing: "3px", color: "var(--gold)", fontWeight: 600 }}>
                ECHO OF THE VOID KING
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              A manga series set in Soulmarch — a world where your soul determines your worth, and some are born with none.
            </p>
            <p style={{ fontSize: 10, letterSpacing: "2px", color: "var(--dimmer)" }}>
              BY ABU SAYEED SIYAM
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>NAVIGATE</div>
            {[
              ["STORY", "#story"],
              ["CHARACTERS", "#characters"],
              ["LORE", "#lore"],
              ["ARCS", "#arcs"],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{
                display: "block", marginBottom: 12,
                fontSize: 12, letterSpacing: "2px", color: "var(--dim)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Cast quick ref */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>THE CAST</div>
            {["KAIRU", "MIRA", "SERAPH", "VAEL", "HESSA", "SOLA", "FEN"].map((name) => (
              <a key={name} href="#characters" style={{
                display: "block", marginBottom: 10,
                fontSize: 12, letterSpacing: "1.5px", color: "var(--dimmer)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dimmer)")}
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="divider" style={{ marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 10, color: "var(--dimmer)", letterSpacing: "1.5px" }}>
            © ECHO OF THE VOID KING · ALL RIGHTS RESERVED
          </p>
          <p style={{ fontSize: 10, color: "var(--dimmer)", letterSpacing: "1.5px", fontStyle: "italic" }}>
            "Some names are carved so deep they outlast the stone."
          </p>
        </div>
      </div>
    </footer>
  );
}
