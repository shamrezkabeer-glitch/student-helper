import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "admin123"; // Baad mein backend se validate karenge

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Password galat hai!");
      setPassword("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "100px auto", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h1>Admin Login</h1>
      <input
        type="password"
        placeholder="Password daalo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box", fontSize: "16px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontSize: "16px" }}
      >
        Login
      </button>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>Password: admin123</p>
    </div>
  );
};

export default AdminLogin;