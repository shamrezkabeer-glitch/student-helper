import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LatestNews = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("9");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/news");
      setNewsList(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching news:", error);
      setLoading(false);
    }
  };

  const filteredNews = newsList.filter(item => item.class === selectedClass);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/")} style={{ fontSize: "20px", padding: "10px", marginBottom: "20px" }}>🏠 Home</button>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Latest News</h1>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" }}>
        {["9", "10", "11", "12"].map((classNum) => (
          <button
            key={classNum}
            onClick={() => setSelectedClass(classNum)}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedClass === classNum ? "#007bff" : "#ddd",
              color: selectedClass === classNum ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Class {classNum}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredNews.length > 0 ? (
        filteredNews.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.title}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px", marginBottom: "10px" }}
              />
            )}
            <span style={{ backgroundColor: "#007bff", color: "white", padding: "5px 10px", borderRadius: "3px", fontSize: "12px", marginRight: "5px" }}>
              {item.category}
            </span>
            <h3 style={{ margin: "10px 0" }}>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>📅 {item.date}</p>
            <p style={{ color: "#888", fontSize: "12px" }}>Class: {item.class}</p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>Koi news nahi</p>
      )}
    </div>
  );
};

export default LatestNews;