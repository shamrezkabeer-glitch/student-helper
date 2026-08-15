import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("9");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = ["9", "10", "11", "12"];
  const subjects = ["Physics", "Maths", "Chemistry"];
  const chapters = { "Physics": ["Chapter 1", "Chapter 2", "Chapter 3"], "Maths": ["Chapter 1", "Chapter 2", "Chapter 3"], "Chemistry": ["Chapter 1", "Chapter 2", "Chapter 3"] };

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedChapter) {
      fetchQuestions();
    }
  }, [selectedClass, selectedSubject, selectedChapter]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://student-helper-production-c02d.up.railway.app/api/questions");
      const filtered = response.data.filter(item => 
        item.class === selectedClass && 
        item.subject === selectedSubject && 
        item.chapter === selectedChapter
      );
      setQuestions(filtered);
    } catch (error) {
      console.log("Error:", error);
      setQuestions([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => navigate("/")} style={{ fontSize: "20px", padding: "10px" }}>🏠</button>
      <h1>Practice Questions</h1>

      <div style={{ marginBottom: "20px" }}>
        {classes.map(cls => (
          <button key={cls} onClick={() => { setSelectedClass(cls); setSelectedSubject(null); setSelectedChapter(null); }} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedClass === cls ? "#007bff" : "#ddd", color: selectedClass === cls ? "white" : "black", border: "none", borderRadius: "5px" }}>
            Class {cls}
          </button>
        ))}
      </div>

      {selectedClass && (
        <div style={{ marginBottom: "20px" }}>
          {subjects.map(subject => (
            <button key={subject} onClick={() => { setSelectedSubject(subject); setSelectedChapter(null); }} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedSubject === subject ? "#28a745" : "#ddd", color: selectedSubject === subject ? "white" : "black", border: "none", borderRadius: "5px" }}>
              {subject}
            </button>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div style={{ marginBottom: "20px" }}>
          {chapters[selectedSubject].map(chapter => (
            <button key={chapter} onClick={() => setSelectedChapter(chapter)} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedChapter === chapter ? "#ffc107" : "#ddd", color: selectedChapter === chapter ? "black" : "black", border: "none", borderRadius: "5px" }}>
              {chapter}
            </button>
          ))}
        </div>
      )}

      {loading ? <p>Loading...</p> : questions.length > 0 ? (
        <div>
          {questions.map((q, idx) => (
            <div key={idx} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px auto", maxWidth: "600px", borderRadius: "5px", textAlign: "left" }}>
              <h3>Q{idx + 1}: {q.question}</h3>
              <details>
                <summary style={{ cursor: "pointer", color: "#007bff" }}>Solution Dekho</summary>
                <p style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>{q.solution}</p>
              </details>
            </div>
          ))}
        </div>
      ) : <p>Koi questions nahi</p>}
    </div>
  );
};

export default Practice;