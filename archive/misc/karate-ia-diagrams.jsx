import { useState } from "react";

const c = {
  bg: "#0a0a0c",
  card: "#131316",
  border: "#1e1e24",
  borderActive: "#2a2a32",
  text: "#f0eeeb",
  secondary: "#c0bfbb",
  muted: "#b0aead",
  dim: "#666666",
  ghost: "#555555",
  red: "#ff6b6b",
  orange: "#f4a261",
  teal: "#2a9d8f",
  blue: "#457b9d",
  purple: "#9b5de5",
  gold: "#e9c46a",
};

const Tile = ({ label, sub, accent = c.border, span = 1, minH = 68, dashed, dimmed, badge, icon }) => (
  <div
    style={{
      gridColumn: `span ${span}`,
      background: dimmed ? "transparent" : c.card,
      border: dashed ? `1px dashed ${c.borderActive}` : `1px solid ${c.border}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 10,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: minH,
      gap: 3,
      position: "relative",
    }}
  >
    {badge && (
      <span style={{
        position: "absolute", top: 6, right: 8,
        fontFamily: "'Space Mono', monospace", fontSize: 8,
        color: c.bg, background: c.borderActive,
        padding: "1px 6px", borderRadius: 3, letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}>{badge}</span>
    )}
    {icon && <span style={{ fontSize: 14, opacity: 0.4 }}>{icon}</span>}
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: dimmed ? c.dim : c.text, letterSpacing: "0.02em" }}>
      {label}
    </span>
    {sub && (
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: c.dim, lineHeight: 1.3 }}>
        {sub}
      </span>
    )}
  </div>
);

const HeroBlock = ({ title, sub, accentColor = c.red }) => (
  <div style={{
    background: `linear-gradient(135deg, #1a1014 0%, ${c.card} 100%)`,
    border: `1px solid ${c.border}`,
    borderRadius: 12, padding: "28px 20px", textAlign: "center",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: accentColor }} />
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: typeof accentColor === 'string' && accentColor.startsWith('linear') ? c.red : accentColor, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5 }}>
      HERO HEADER
    </div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: c.text }}>{title}</div>
    {sub && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: c.dim, marginTop: 4 }}>{sub}</div>}
  </div>
);

const FullTile = ({ label, sub, accent = c.red, minH = 60 }) => (
  <div style={{
    background: c.card, border: `1px solid ${c.border}`,
    borderLeft: `4px solid ${accent}`, borderRadius: 11,
    padding: "16px 18px", textAlign: "center", minHeight: minH,
    display: "flex", flexDirection: "column", justifyContent: "center",
  }}>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: accent, letterSpacing: "0.03em" }}>
      {label}
    </span>
    {sub && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: c.dim, marginTop: 3 }}>{sub}</span>}
  </div>
);

const FooterBlock = () => (
  <div style={{
    background: c.card, border: `1px solid ${c.border}`, borderRadius: 10,
    padding: "11px 16px", textAlign: "center",
  }}>
    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: c.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      Footer · Credits · Version
    </span>
  </div>
);

const SectionLabel = ({ text, color = c.dim }) => (
  <div style={{
    fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
    color, textTransform: "uppercase", letterSpacing: "0.12em",
    padding: "14px 0 5px",
  }}>{text}</div>
);

const DiagramLabel = ({ text, sub, tag }) => (
  <div style={{ textAlign: "center", padding: "16px 0 10px" }}>
    {tag && (
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: 9,
        color: c.bg, background: c.red, padding: "2px 8px",
        borderRadius: 3, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>{tag}</span>
    )}
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: c.text, letterSpacing: "0.03em", marginTop: tag ? 8 : 0 }}>
      {text}
    </div>
    {sub && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: c.dim, marginTop: 3 }}>{sub}</div>}
  </div>
);

function HomeMobile() {
  return (
    <div style={{ maxWidth: 360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
      <DiagramLabel text="Homepage" sub="Mobile · Single column stack" tag="MOBILE" />
      <HeroBlock title="AWIKP · Wado-Ryu" sub="Dojo crest · tagline" />
      <FullTile label="Exam Syllabus" sub="Belt requirements · grading criteria" accent={c.gold} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="History" sub="& Lineage" accent={c.gold} />
        <Tile label="Principles" sub="& Philosophy" accent={c.gold} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Kihon" sub="Kihon & Renraku Waza" accent={c.orange} />
        <Tile label="Kumite" sub="Sanbon, Ohyo, Kihon" accent={c.orange} />
      </div>
      <FullTile label="SPORT KUMITE" sub="Competition training hub" accent={c.red} minH={68} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Tanto Dori" accent={c.purple} />
        <Tile label="Idori & Tachi Dori" accent={c.purple} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Nage Waza" accent={c.purple} />
        <Tile label="Japanese Glossary" accent={c.teal} icon="あ" />
      </div>
      <FullTile label="Strength & Flexibility" accent={c.teal} />
      <FooterBlock />
    </div>
  );
}

function HomeDesktop() {
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 4 }}>
      <DiagramLabel text="Homepage" sub="Desktop · Grouped sections with labels" tag="DESKTOP" />
      <HeroBlock title="AWIKP · Wado-Ryu Karate" sub="Dojo crest · tagline · quick links" />
      <SectionLabel text="Reference & Context" color={c.gold} />
      <FullTile label="Exam Syllabus" sub="Belt requirements · grading criteria" accent={c.gold} minH={54} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
        <Tile label="History & Lineage" accent={c.gold} minH={58} />
        <Tile label="Principles & Philosophy" accent={c.gold} minH={58} />
      </div>
      <SectionLabel text="Wado-Ryu Technique" color={c.orange} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Kihon" sub="Kihon & Renraku Waza" accent={c.orange} />
        <Tile label="Kumite" sub="Sanbon, Ohyo, Kihon" accent={c.orange} />
      </div>
      <SectionLabel text="Competition Training" color={c.red} />
      <FullTile label="SPORT KUMITE" sub="Session builder · Exercise library · WKF rules" accent={c.red} minH={68} />
      <SectionLabel text="Advanced / Dan Grade" color={c.purple} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <Tile label="Tanto Dori" accent={c.purple} minH={58} />
        <Tile label="Idori & Tachi Dori" accent={c.purple} minH={58} />
        <Tile label="Nage Waza" accent={c.purple} minH={58} />
      </div>
      <SectionLabel text="Supporting" color={c.teal} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Japanese Glossary" accent={c.teal} icon="あ" />
        <Tile label="Strength & Flexibility" accent={c.teal} />
      </div>
      <div style={{ marginTop: 8 }}><FooterBlock /></div>
    </div>
  );
}

function SportKumiteHub() {
  return (
    <div style={{ maxWidth: 380, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
      <DiagramLabel text="Sport Kumite Hub" sub="Sub-page · Competition training" />
      <HeroBlock title="Sport Kumite" sub="Competition training hub · WKF-aligned drills" accentColor={c.red} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Tile label="Exercise Library" sub="Browse drills by category, level, focus" accent={c.red} minH={96} icon="📚" />
          <Tile label="Session Library" sub="Pre-built sessions with timing" accent={c.orange} minH={96} icon="⏱" />
        </div>
        <Tile label="Session Builder" sub="Drag & drop session creator" accent={c.dim} minH={200} dashed dimmed badge="FUTURE" icon="🔧" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Tile label="Strength & Flexibility" sub="→ cross-link" accent={c.teal} icon="💪" />
        <Tile label="WKF Rules & Videos" sub="External links" accent={c.blue} icon="🎥" />
      </div>
      <div style={{
        padding: "10px 14px", background: "rgba(255,107,107,0.05)",
        border: `1px solid rgba(255,107,107,0.12)`, borderRadius: 9,
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: c.red, letterSpacing: "0.08em", marginBottom: 4, textTransform: "uppercase" }}>V1 Scope</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: c.muted, lineHeight: 1.5 }}>
          Exercise Library · Sample sessions · S&F link · WKF rules. Builder is placeholder.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("mobile");
  const views = [
    { key: "mobile", label: "Home Mobile" },
    { key: "desktop", label: "Home Desktop" },
    { key: "hub", label: "Sport Kumite" },
    { key: "all", label: "All" },
  ];

  return (
    <div style={{ background: c.bg, minHeight: "100vh", padding: "10px 14px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
        {views.map((v) => (
          <button
            key={v.key}
            onClick={() => setView(v.key)}
            style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              padding: "5px 12px", borderRadius: 5,
              border: `1px solid ${view === v.key ? c.red : c.border}`,
              background: view === v.key ? "rgba(255,107,107,0.1)" : "transparent",
              color: view === v.key ? c.red : c.dim,
              cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >{v.label}</button>
        ))}
      </div>
      {view === "all" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <HomeMobile />
          <div style={{ height: 1, background: c.border, margin: "0 20px" }} />
          <HomeDesktop />
          <div style={{ height: 1, background: c.border, margin: "0 20px" }} />
          <SportKumiteHub />
        </div>
      ) : view === "mobile" ? <HomeMobile /> : view === "desktop" ? <HomeDesktop /> : <SportKumiteHub />}
    </div>
  );
}
