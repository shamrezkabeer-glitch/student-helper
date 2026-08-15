import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Papers Work", sub: "Past Papers • Guess • Notes", icon: "📝", route: "/papers-work", glow: "#22D3EE" },
    { label: "Latest News", sub: "Updates • Announcements", icon: "📰", route: "/latest-news", glow: "#6366F1" },
    { label: "Practice Questions", sub: "MCQs • Short & Long Questions", icon: "✏️", route: "/practice", glow: "#F5B942" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#050810",
      backgroundImage: "linear-gradient(rgba(5,8,16,0.75), rgba(5,8,16,0.9)), url('/hero-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* HERO SECTION */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "50px 20px",
        color: "#EAF6FF"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#22D3EE",
          border: "1px solid rgba(34,211,238,0.4)",
          borderRadius: "20px",
          padding: "8px 18px",
          marginBottom: "28px",
          boxShadow: "0 0 20px rgba(34,211,238,0.15)"
        }}>
          🎓 Sindh Board · 2026 Session
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "54px",
          lineHeight: 1.05,
          marginBottom: "16px",
          letterSpacing: "-0.01em",
          textShadow: "0 0 30px rgba(34,211,238,0.35)"
        }}>
          Student <span style={{
            color: "#22D3EE",
            textShadow: "0 0 25px rgba(34,211,238,0.7)"
          }}>Helper</span>
        </h1>
        <p style={{
          fontSize: "16px",
          marginBottom: "50px",
          color: "rgba(234,246,255,0.7)",
          fontWeight: 400
        }}>
          Only Sindh Board Students 📚
        </p>

        {/* BUTTONS */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          maxWidth: "460px"
        }}>
          {buttons.map((btn) => (
            <button
              key={btn.route}
              onClick={() => navigate(btn.route)}
              style={{
                padding: "20px 26px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                backgroundColor: "rgba(10,14,24,0.65)",
                backdropFilter: "blur(6px)",
                color: "#EAF6FF",
                border: `1px solid ${btn.glow}`,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
                boxShadow: `0 0 18px ${btn.glow}33`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 35px ${btn.glow}88`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 18px ${btn.glow}33`;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "17px" }}>{btn.icon} {btn.label}</span>
                <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(234,246,255,0.55)" }}>{btn.sub}</span>
              </span>
              <span style={{ color: btn.glow, fontSize: "20px" }}>›</span>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: "rgba(5,8,16,0.85)",
        color: "#EAF6FF",
        textAlign: "center",
        padding: "30px 20px",
        borderTop: "1px solid rgba(34,211,238,0.2)"
      }}>
        <h3 style={{
          marginBottom: "10px",
          fontSize: "16px",
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          color: "#22D3EE"
        }}>
          Student Helper
        </h3>
        <p style={{ marginBottom: "10px", opacity: 0.65, fontSize: "13.5px" }}>Your Complete Learning Platform for Sindh Board</p>
        <p style={{ fontSize: "11.5px", opacity: 0.45, fontFamily: "'IBM Plex Mono', monospace" }}>Class 9-12 | Notes • Papers • Practice Questions</p>
        <p style={{ fontSize: "11.5px", opacity: 0.35, marginTop: "15px" }}>© 2026 Student Helper. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;