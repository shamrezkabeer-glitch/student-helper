import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9fa" }}>
      {/* HERO SECTION */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          Student Helper
        </h1>
        <p style={{
          fontSize: "20px",
          marginBottom: "40px",
          opacity: 0.95,
          fontWeight: "300"
        }}>
          Only Sindh Board Students 📚
        </p>

        {/* BUTTONS */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <button
            onClick={() => navigate("/papers-work")}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              color: "#667eea",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transform: "scale(1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            📝 Papers Work
          </button>

          <button
            onClick={() => navigate("/latest-news")}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              color: "#667eea",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transform: "scale(1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            📰 Latest News
          </button>

          <button
            onClick={() => navigate("/practice")}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              color: "#667eea",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transform: "scale(1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            ✏️ Practice Questions
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: "#2c3e50",
        color: "white",
        textAlign: "center",
        padding: "30px 20px",
        borderTop: "3px solid #667eea"
      }}>
        <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Student Helper</h3>
        <p style={{ marginBottom: "10px", opacity: 0.9 }}>Your Complete Learning Platform for Sindh Board</p>
        <p style={{ fontSize: "12px", opacity: 0.7 }}>Class 9-12 | Notes • Papers • Practice Questions</p>
        <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "15px" }}>© 2026 Student Helper. All Rights Reserved.</p>
        <button
          onClick={() => navigate("/admin-login")}
          style={{
            marginTop: "15px",
            padding: "8px 15px",
            fontSize: "12px",
            backgroundColor: "transparent",
            color: "#667eea",
            border: "1px solid #667eea",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#667eea";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#667eea";
          }}
        >
          Admin Login
        </button>
      </footer>
    </div>
  );
};

export default Home;