import { useState } from "react";

const ACCENT = {
  red: "#ff6b6b",
  orange: "#f4a261",
  teal: "#2a9d8f",
  blue: "#457b9d",
  purple: "#9b5de5",
  gold: "#e9c46a",
};

// Elevated design mockup — comparing STOCK vs ELEVATED treatments
export default function KarateUIConcept() {
  const [activeSection, setActiveSection] = useState("elevated");
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div style={{
      background: "#0a0a0c",
      minHeight: "100vh",
      color: "#f0eeeb",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      {/* Toggle */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#0e0e10ee", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e1e24",
        display: "flex", justifyContent: "center", gap: "4px", padding: "12px",
      }}>
        {["stock", "elevated"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            background: activeSection === s ? "#ff6b6b" : "#1e1e24",
            color: activeSection === s ? "#0a0a0c" : "#c0bfbb",
            border: "none", borderRadius: "20px",
            padding: "8px 24px", fontSize: "0.85rem",
            fontWeight: activeSection === s ? 700 : 500,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s ease",
          }}>{s === "stock" ? "❌ Current (Stock)" : "✅ Elevated (Proposed)"}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {activeSection === "stock" ? (
          <StockVersion expandedCard={expandedCard} setExpandedCard={setExpandedCard} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        ) : (
          <ElevatedVersion expandedCard={expandedCard} setExpandedCard={setExpandedCard} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STOCK VERSION — How it looks now
   ═══════════════════════════════════════════════ */
function StockVersion({ expandedCard, setExpandedCard, activeFilter, setActiveFilter }) {
  return (
    <div>
      {/* Page Title — stock */}
      <div style={{ padding: "32px 0 8px" }}>
        <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", color: "#ff6b6b", margin: 0, fontWeight: 700 }}>
          Kumite Drills
        </h1>
        <p style={{ color: "#b0aead", fontSize: "0.9rem", margin: "4px 0 0" }}>80 WKF competition sparring drills</p>
      </div>

      {/* Filters — stock (always visible, flat pills) */}
      <div style={{ padding: "12px 0", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All 80", "Attack (Sen) 21", "Defence (Uke) 14", "Counter 15"].map((f, i) => (
          <button key={i} style={{
            background: i === 0 ? "#ff6b6b22" : "#1e1e24",
            border: i === 0 ? "1px solid #ff6b6b" : "1px solid #1e1e24",
            color: i === 0 ? "#ff6b6b" : "#c0bfbb",
            borderRadius: "18px", padding: "6px 14px",
            fontSize: "0.8rem", fontFamily: "'Space Mono', monospace",
            cursor: "pointer",
          }}>{f}</button>
        ))}
      </div>
      <div style={{ padding: "4px 0 16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All 80", "Beginner 27", "Intermediate 30", "Advanced 23"].map((f, i) => (
          <button key={i} style={{
            background: i === 0 ? "#ff6b6b22" : "#1e1e24",
            border: i === 0 ? "1px solid #ff6b6b" : "1px solid #1e1e24",
            color: i === 0 ? "#ff6b6b" : "#c0bfbb",
            borderRadius: "18px", padding: "6px 14px",
            fontSize: "0.8rem", fontFamily: "'Space Mono', monospace",
            cursor: "pointer",
          }}>{f}</button>
        ))}
      </div>

      {/* Cards — stock (single column, flat) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "40px" }}>
        {stockDrills.map((drill, i) => (
          <div key={i} style={{
            background: "#131316",
            border: "1px solid #1e1e24",
            borderLeft: `4px solid ${drill.color}`,
            borderRadius: "12px",
            padding: "16px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 600 }}>{drill.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#ff6b6b", marginTop: "2px" }}>{drill.japanese}</div>
              </div>
              <span style={{ color: "#666", fontSize: "0.8rem" }}>∨</span>
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
              {drill.tags.map((t, j) => (
                <span key={j} style={{
                  background: "#1e1e24", border: "1px solid #2a2a32",
                  borderRadius: "6px", padding: "2px 8px",
                  fontSize: "0.7rem", color: "#b0aead",
                  fontFamily: "'Space Mono', monospace",
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              <span style={{ border: "1px solid #e9c46a", color: "#e9c46a", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", fontFamily: "'Space Mono', monospace" }}>YUKO (1pt)</span>
              <span style={{ border: "1px solid #2a9d8f", color: "#2a9d8f", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", fontFamily: "'Space Mono', monospace" }}>Beginner</span>
              <span style={{ border: "1px solid #666", color: "#666", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", fontFamily: "'Space Mono', monospace" }}>Solo Drill</span>
            </div>
          </div>
        ))}
      </div>

      {/* Home tiles — stock */}
      <div style={{ padding: "20px 0" }}>
        <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", color: "#2a9d8f", margin: "0 0 12px" }}>Strength & Mobility</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {stockTiles.map((tile, i) => (
            <div key={i} style={{
              background: "#131316",
              border: "1px solid #1e1e24",
              borderRadius: "12px",
              padding: "16px",
              display: "flex", alignItems: "center", gap: "12px",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: "1.4rem" }}>{tile.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{tile.name}</div>
                <div style={{ color: "#b0aead", fontSize: "0.8rem", marginTop: "2px" }}>{tile.desc}</div>
              </div>
              <span style={{ color: tile.color, fontWeight: 700, fontSize: "0.9rem" }}>{tile.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ELEVATED VERSION — The proposed redesign
   ═══════════════════════════════════════════════ */
function ElevatedVersion({ expandedCard, setExpandedCard, activeFilter, setActiveFilter }) {
  const filters = [
    { id: "all", label: "All", count: 80, color: "#ff6b6b" },
    { id: "attack", label: "Attack", sub: "Sen", count: 21, color: "#ff6b6b" },
    { id: "defence", label: "Defence", sub: "Uke", count: 14, color: "#457b9d" },
    { id: "counter", label: "Counter", sub: "Go no Sen", count: 15, color: "#f4a261" },
    { id: "anticipation", label: "Anticipation", count: 15, color: "#9b5de5" },
  ];

  const levels = [
    { id: "all", label: "All Levels" },
    { id: "beginner", label: "Beginner", color: "#2a9d8f" },
    { id: "intermediate", label: "Intermediate", color: "#f4a261" },
    { id: "advanced", label: "Advanced", color: "#ff6b6b" },
  ];

  return (
    <div>
      {/* Page Title — elevated */}
      <div style={{ padding: "40px 0 4px", position: "relative" }}>
        {/* Subtle radial glow behind title */}
        <div style={{
          position: "absolute", top: "20px", left: "-40px",
          width: "300px", height: "120px",
          background: "radial-gradient(ellipse at center, rgba(255,107,107,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#ff6b6b", margin: "0 0 8px",
          fontFamily: "'Space Mono', monospace",
        }}>Sport Kumite</p>
        <h1 style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "2.2rem", fontWeight: 800, margin: 0,
          letterSpacing: "-0.02em", lineHeight: 1.1,
          background: "linear-gradient(135deg, #f0eeeb 0%, #c0bfbb 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Kumite Drills</h1>
        <p style={{
          color: "#666", fontSize: "0.85rem", margin: "8px 0 0",
          fontWeight: 400, lineHeight: 1.5,
        }}>
          <span style={{ color: "#b0aead" }}>80</span> WKF competition drills · <span style={{ color: "#b0aead" }}>5</span> categories · <span style={{ color: "#b0aead" }}>3</span> levels
        </p>
      </div>

      {/* Filters — elevated (compact, expressive) */}
      <div style={{ padding: "20px 0 8px" }}>
        <div style={{
          display: "flex", gap: "6px", overflowX: "auto",
          paddingBottom: "8px", scrollbarWidth: "none",
        }}>
          {filters.map(f => {
            const isActive = activeFilter === f.id;
            return (
              <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
                background: isActive
                  ? `linear-gradient(135deg, ${f.color}20 0%, ${f.color}08 100%)`
                  : "#131316",
                border: `1px solid ${isActive ? f.color + "40" : "#1e1e24"}`,
                color: isActive ? f.color : "#888",
                borderRadius: "10px", padding: "8px 14px",
                fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: "6px",
                boxShadow: isActive ? `0 0 20px ${f.color}10` : "none",
              }}>
                {f.label}
                {f.sub && <span style={{ opacity: 0.5, fontSize: "0.7rem" }}>({f.sub})</span>}
                <span style={{
                  background: isActive ? f.color + "25" : "#1e1e24",
                  borderRadius: "6px", padding: "1px 6px",
                  fontSize: "0.7rem", fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  minWidth: "20px", textAlign: "center",
                }}>{f.count}</span>
              </button>
            );
          })}
        </div>
        {/* Level pills — more subtle */}
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          {levels.map(l => (
            <button key={l.id} style={{
              background: l.id === "all" ? "transparent" : "transparent",
              border: "none",
              color: l.id === "all" ? "#f0eeeb" : (l.color || "#888"),
              fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif",
              fontWeight: l.id === "all" ? 700 : 500,
              cursor: "pointer", padding: "4px 8px",
              borderBottom: l.id === "all" ? "2px solid #f0eeeb" : "2px solid transparent",
              transition: "all 0.15s ease",
              opacity: l.id === "all" ? 1 : 0.7,
            }}>{l.label}</button>
          ))}
        </div>
      </div>

      {/* Cards — elevated (multi-column, depth, interaction) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "12px",
        paddingBottom: "40px",
        paddingTop: "12px",
      }}>
        {elevatedDrills.map((drill, i) => {
          const isExpanded = expandedCard === i;
          return (
            <div
              key={i}
              onClick={() => setExpandedCard(isExpanded ? null : i)}
              style={{
                background: `linear-gradient(170deg, #151518 0%, #111114 100%)`,
                border: `1px solid ${isExpanded ? drill.color + "30" : "#1e1e2400"}`,
                borderLeft: `3px solid ${drill.color}`,
                borderRadius: "14px",
                padding: "18px 18px 14px",
                cursor: "pointer",
                transition: "all 0.2s ease, transform 0.15s ease",
                boxShadow: isExpanded
                  ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${drill.color}08`
                  : "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.02)",
                transform: isExpanded ? "scale(1)" : "scale(1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle corner glow */}
              <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "80px", height: "80px",
                background: `radial-gradient(circle, ${drill.color}06 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "0.95rem", fontWeight: 700,
                    lineHeight: 1.3, letterSpacing: "-0.01em",
                    color: "#f0eeeb",
                  }}>{drill.name}</div>
                  <div style={{
                    fontSize: "0.8rem", color: drill.color,
                    marginTop: "3px", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500, opacity: 0.8,
                  }}>{drill.japanese}</div>
                </div>
                <div style={{
                  color: "#444", fontSize: "0.75rem",
                  transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                }}>▾</div>
              </div>

              {/* Badges — elevated with fills */}
              <div style={{ display: "flex", gap: "5px", marginTop: "10px", flexWrap: "wrap" }}>
                <span style={{
                  background: "rgba(233,196,106,0.12)", color: "#e9c46a",
                  borderRadius: "6px", padding: "3px 8px",
                  fontSize: "0.68rem", fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "0.02em",
                }}>{drill.scoring}</span>
                <span style={{
                  background: `${drill.levelColor}15`, color: drill.levelColor,
                  borderRadius: "6px", padding: "3px 8px",
                  fontSize: "0.68rem", fontWeight: 600,
                }}>{drill.level}</span>
                <span style={{
                  background: "rgba(255,255,255,0.04)", color: "#888",
                  borderRadius: "6px", padding: "3px 8px",
                  fontSize: "0.68rem", fontWeight: 500,
                }}>{drill.format}</span>
              </div>

              {/* Tags — smaller, subtler */}
              <div style={{
                display: "flex", gap: "4px", marginTop: "8px", flexWrap: "wrap",
              }}>
                {drill.tags.map((t, j) => (
                  <span key={j} style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "4px", padding: "2px 7px",
                    fontSize: "0.65rem", color: "#666",
                    fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>

              {/* Expanded content */}
              <div style={{
                maxHeight: isExpanded ? "400px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease, opacity 0.2s ease",
                opacity: isExpanded ? 1 : 0,
              }}>
                <div style={{
                  marginTop: "14px", paddingTop: "14px",
                  borderTop: `1px solid ${drill.color}15`,
                }}>
                  <p style={{
                    fontSize: "0.82rem", color: "#b0aead",
                    lineHeight: 1.65, margin: "0 0 12px",
                  }}>{drill.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div>
                      <span style={{
                        fontSize: "0.65rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "#555", fontFamily: "'Space Mono', monospace",
                      }}>KEY POINTS</span>
                      <ul style={{
                        margin: "6px 0 0", paddingLeft: "16px",
                        fontSize: "0.78rem", color: "#999", lineHeight: 1.6,
                      }}>
                        <li>Lead hand stays relaxed until the last 10cm — then snap</li>
                        <li>Back foot pushes, don't pull with the front</li>
                        <li>Reset fully between each rep</li>
                      </ul>
                    </div>
                    <div style={{
                      background: "rgba(255,107,107,0.04)",
                      borderRadius: "8px", padding: "10px 12px",
                      borderLeft: "2px solid rgba(255,107,107,0.2)",
                    }}>
                      <span style={{
                        fontSize: "0.65rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "#ff6b6b80", fontFamily: "'Space Mono', monospace",
                      }}>COMMON ERROR</span>
                      <p style={{
                        fontSize: "0.78rem", color: "#b0aead",
                        margin: "4px 0 0", lineHeight: 1.5,
                      }}>Telegraphing by retracting the hand before punching — the jab should fire forward from its resting position.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEPARATOR */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #2a2a32, transparent)",
        margin: "20px 0 40px",
      }} />

      {/* Home tiles — elevated */}
      <div style={{ padding: "0 0 20px" }}>
        <p style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#2a9d8f",
          margin: "0 0 8px", fontFamily: "'Space Mono', monospace",
        }}>Physical Preparation</p>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1.6rem", fontWeight: 800, margin: "0 0 20px",
          letterSpacing: "-0.02em",
        }}>Strength & Mobility</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}>
          {elevatedTiles.map((tile, i) => (
            <div key={i} style={{
              background: `linear-gradient(160deg, ${tile.color}08 0%, #131316 40%, #111114 100%)`,
              border: "1px solid #1e1e2400",
              borderRadius: "16px",
              padding: "22px 20px",
              cursor: "pointer",
              transition: "all 0.2s ease, transform 0.15s ease",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
            }}>
              {/* Subtle gradient orb */}
              <div style={{
                position: "absolute", top: "-30px", right: "-30px",
                width: "120px", height: "120px",
                background: `radial-gradient(circle, ${tile.color}0a 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "12px",
              }}>
                <div style={{
                  width: "40px", height: "40px",
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${tile.color}18 0%, ${tile.color}08 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem",
                }}>
                  {tile.icon}
                </div>
                <div>
                  <div style={{
                    fontWeight: 700, fontSize: "1rem",
                    letterSpacing: "-0.01em",
                  }}>{tile.name}</div>
                </div>
              </div>

              <p style={{
                color: "#888", fontSize: "0.78rem",
                margin: 0, lineHeight: 1.5,
              }}>{tile.desc}</p>

              <div style={{
                display: "flex", gap: "8px", marginTop: "14px",
                flexWrap: "wrap",
              }}>
                {tile.stats.map((s, j) => (
                  <span key={j} style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "6px", padding: "4px 10px",
                    fontSize: "0.7rem", color: "#666",
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 500,
                  }}>
                    <span style={{ color: tile.color, fontWeight: 700 }}>{s.value}</span>
                    {" "}{s.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge comparison */}
      <div style={{
        margin: "40px 0", padding: "24px",
        background: "linear-gradient(170deg, #151518, #111114)",
        borderRadius: "16px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
      }}>
        <p style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#555",
          margin: "0 0 16px", fontFamily: "'Space Mono', monospace",
        }}>Badge Comparison — Stock vs Elevated</p>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#555", marginBottom: "8px" }}>STOCK (border only):</p>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ border: "1px solid #2a9d8f", color: "#2a9d8f", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem" }}>Beginner</span>
              <span style={{ border: "1px solid #f4a261", color: "#f4a261", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem" }}>Intermediate</span>
              <span style={{ border: "1px solid #ff6b6b", color: "#ff6b6b", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem" }}>Advanced</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#555", marginBottom: "8px" }}>ELEVATED (filled, no border):</p>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ background: "rgba(42,157,143,0.14)", color: "#2a9d8f", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>Beginner</span>
              <span style={{ background: "rgba(244,162,97,0.14)", color: "#f4a261", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>Intermediate</span>
              <span style={{ background: "rgba(255,107,107,0.14)", color: "#ff6b6b", borderRadius: "6px", padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600 }}>Advanced</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#555", marginBottom: "8px" }}>STOCK tags:</p>
            <div style={{ display: "flex", gap: "4px" }}>
              {["Kizami-Zuki", "Entry", "Footwork"].map(t => (
                <span key={t} style={{ background: "#1e1e24", border: "1px solid #2a2a32", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", color: "#b0aead", fontFamily: "'Space Mono', monospace" }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", color: "#555", marginBottom: "8px" }}>ELEVATED tags:</p>
            <div style={{ display: "flex", gap: "4px" }}>
              {["Kizami-Zuki", "Entry", "Footwork"].map(t => (
                <span key={t} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "4px", padding: "2px 7px", fontSize: "0.65rem", color: "#666", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "60px" }} />
    </div>
  );
}

// ── Dummy data ──

const stockDrills = [
  { name: "Kizami-Zuki Entry — Step and Jab", japanese: "刻み突き", color: "#ff6b6b", tags: ["Kizami-Zuki", "Entry", "Footwork", "Senshu", "Tsugi-Ashi"] },
  { name: "Gyaku-Zuki Drive — Rear-Hand Power Entry", japanese: "逆突き", color: "#ff6b6b", tags: ["Gyaku-Zuki", "Entry", "Hip Rotation", "Chudan", "Jodan"] },
  { name: "Mawashi-Geri Chudan — Roundhouse Kick Body", japanese: "回し蹴り", color: "#ff6b6b", tags: ["Mawashi-Geri", "Chudan", "Scoring", "Solo"] },
];

const stockTiles = [
  { icon: "💪", name: "Strength", desc: "39 exercises · 13 movement patterns", count: "39", color: "#ff6b6b" },
  { icon: "🧘", name: "Mobility", desc: "30 exercises · 10 body zones", count: "30", color: "#e9c46a" },
  { icon: "🔴", name: "Karate Specific Exercises", desc: "26 Wado-Ryū specific drills", count: "26", color: "#457b9d" },
  { icon: "🔥", name: "Warm-Up", desc: "RAMP framework · 10 slots", count: "30", color: "#2a9d8f" },
];

const elevatedDrills = [
  { name: "Kizami-Zuki Entry — Step and Jab", japanese: "刻み突き", color: "#ff6b6b", scoring: "YUKO (1pt)", level: "Beginner", levelColor: "#2a9d8f", format: "Solo", tags: ["Kizami-Zuki", "Entry", "Footwork", "Senshu"], desc: "From fighting kamae, practise the sliding entry (tsugi-ashi) followed by a committed kizami-zuki to the opponent's face level. The back foot pushes, the front foot slides forward, and the lead hand fires at the end of the slide." },
  { name: "Gyaku-Zuki Drive — Rear-Hand Power", japanese: "逆突き", color: "#ff6b6b", scoring: "YUKO (1pt)", level: "Beginner", levelColor: "#2a9d8f", format: "Solo", tags: ["Gyaku-Zuki", "Entry", "Hip Rotation", "Chudan"], desc: "Drive from the rear leg into a committed reverse punch. The hip rotation generates the power — the arm is just the delivery system." },
  { name: "Mawashi-Geri Chudan — Roundhouse Body", japanese: "回し蹴り", color: "#ff6b6b", scoring: "WAZA-ARI (2pt)", level: "Intermediate", levelColor: "#f4a261", format: "Partnered", tags: ["Mawashi-Geri", "Chudan", "Scoring"], desc: "The bread-and-butter WKF body kick. Chamber laterally, rotate the hip over, and strike with the instep to the opponent's trunk protector." },
  { name: "Ashi-Barai Counter — Sweep on Entry", japanese: "足払い", color: "#457b9d", scoring: "IPPON (3pt)", level: "Advanced", levelColor: "#ff6b6b", format: "Partnered", tags: ["Ashi-Barai", "Counter", "Timing"], desc: "Time the opponent's forward step and sweep the support foot at the moment of weight commitment. Follow with a controlled technique to the downed opponent." },
  { name: "De-ai — Simultaneous Intercept", japanese: "出合い", color: "#f4a261", scoring: "YUKO (1pt)", level: "Advanced", levelColor: "#ff6b6b", format: "Partnered", tags: ["Sen no Sen", "Intercept", "Timing", "Distance"], desc: "Attack into the opponent's attack, intercepting with a scoring technique before their technique completes. The highest-level timing skill in WKF kumite." },
  { name: "Angle-Step Kizami — Lateral Entry", japanese: "刻み突き", color: "#9b5de5", scoring: "YUKO (1pt)", level: "Intermediate", levelColor: "#f4a261", format: "Solo", tags: ["Kizami-Zuki", "Angle", "Footwork", "Positional"], desc: "Step off the centre line at 45° before firing kizami-zuki. The angle change makes the jab harder to read and opens the opponent's guard." },
];

const elevatedTiles = [
  { icon: "💪", name: "Strength", color: "#ff6b6b", desc: "Functional movement patterns with three progression levels per exercise family", stats: [{ value: "39", label: "exercises" }, { value: "13", label: "patterns" }, { value: "3", label: "levels" }] },
  { icon: "🧘", name: "Mobility", color: "#e9c46a", desc: "Body-zone targeted flexibility and corrective work for karate-specific demands", stats: [{ value: "30", label: "exercises" }, { value: "10", label: "zones" }, { value: "3", label: "levels" }] },
  { icon: "🥋", name: "Karate Specific", color: "#457b9d", desc: "Wado-Ryū drills for kihon, taisabaki, kumite forms, kata conditioning and nage-waza", stats: [{ value: "26", label: "drills" }, { value: "6", label: "groups" }] },
  { icon: "🔥", name: "Warm-Up", color: "#2a9d8f", desc: "Structured RAMP framework with interchangeable options per slot for session variety", stats: [{ value: "3", label: "phases" }, { value: "10", label: "slots" }, { value: "30", label: "options" }] },
];
