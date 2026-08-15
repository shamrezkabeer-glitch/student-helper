import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Papers Work", icon: "📝", route: "/papers-work" },
    { label: "Latest News", icon: "📰", route: "/latest-news" },
    { label: "Practice Questions", icon: "✏️", route: "/practice" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#0E1116", fontFamily: "'Inter', sans-serif" }}>
      {/* HERO SECTION */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        color: "#F4F0E6"
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#D3A24C",
          marginBottom: "22px"
        }}>
          Sindh Board · 2026 Session
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: "52px",
          lineHeight: 1.05,
          marginBottom: "14px",
          letterSpacing: "-0.01em"
        }}>
          Student <span style={{ color: "#D3A24C", fontStyle: "italic", fontWeight: 500 }}>Helper</span>
        </h1>
        <p style={{
          fontSize: "17px",
          marginBottom: "48px",
          color: "rgba(244,240,230,0.55)",
          fontWeight: 400
        }}>
          Only Sindh Board Students 📚
        </p>

        {/* BUTTONS */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "rgba(244,240,230,0.12)",
          border: "1px solid rgba(244,240,230,0.12)",
          borderRadius: "6px",
          overflow: "hidden"
        }}>
          {buttons.map((btn) => (
            <button
              key={btn.route}
              onClick={() => navigate(btn.route)}
              style={{
                padding: "20px 26px",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "'Fraunces', serif",
                backgroundColor: "#171B22",
                color: "#F4F0E6",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#20242D";
                e.currentTarget.style.color = "#D3A24C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#171B22";
                e.currentTarget.style.color = "#F4F0E6";
              }}
            >
              <span>{btn.icon} {btn.label}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", opacity: 0.5 }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: "#0A0C10",
        color: "#F4F0E6",
        textAlign: "center",
        padding: "34px 20px",
        borderTop: "1px solid rgba(244,240,230,0.12)"
      }}>
        <h3 style={{
          marginBottom: "10px",
          fontSize: "17px",
          fontFamily: "'Fraunces', serif",
          fontWeight: 600
        }}>
          Student Helper
        </h3>
        <p style={{ marginBottom: "10px", opacity: 0.6, fontSize: "14px" }}>Your Complete Learning Platform for Sindh Board</p>
        <p style={{ fontSize: "12px", opacity: 0.45, fontFamily: "'IBM Plex Mono', monospace" }}>Class 9-12 | Notes • Papers • Practice Questions</p>
        <p style={{ fontSize: "12px", opacity: 0.35, marginTop: "15px" }}>© 2026 Student Helper. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;