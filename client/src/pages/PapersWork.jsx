import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PapersWork = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("9");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = ["9", "10", "11", "12"];
  const groups = { "11": ["Pre-Medical", "Pre-Engineering", "Computer Science"], "12": ["Pre-Medical", "Pre-Engineering", "Computer Science"] };
  const subjects = {
    "9": ["Computer", "Biology", "Physics", "Chemistry", "Maths", "English", "Urdu", "Islamiyat"],
    "10": ["Computer", "Biology", "Physics", "Chemistry", "Maths", "English", "Pak Studies", "Sindhi"],
    "11-Pre-Medical": ["Zoology", "Botany", "Chemistry", "Physics", "English", "Urdu", "Islamiyat"],
    "11-Pre-Engineering": ["Maths", "Chemistry", "Physics", "English", "Urdu", "Islamiyat"],
    "11-Computer Science": ["Computer", "Maths", "Physics", "English", "Urdu", "Islamiyat"],
    "12-Pre-Medical": ["Zoology", "Botany", "Chemistry", "Physics", "English", "Urdu", "Pak Studies"],
    "12-Pre-Engineering": ["Maths", "Chemistry", "Physics", "English", "Urdu", "Pak Studies"],
    "12-Computer Science": ["Computer", "Maths", "Physics", "English", "Urdu", "Pak Studies"],
  };

  const paperTypes = ["Notes", "Past Paper", "Model Paper", "Guess Paper"];

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchPapers();
    }
  }, [selectedClass, selectedSubject]);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("student-helper-production-c02d.up.railway.app/api/papers");
      const filtered = response.data.filter(item => item.class === selectedClass && item.subject.toLowerCase().trim() === selectedSubject.toLowerCase());
      setPapers(filtered);
    } catch (error) {
      console.log("Error:", error);
      setPapers([]);
    }
    setLoading(false);
  };

  const getSubjects = () => {
    if (["11", "12"].includes(selectedClass) && selectedGroup) {
      return subjects[`${selectedClass}-${selectedGroup}`] || [];
    }
    return subjects[selectedClass] || [];
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => navigate("/")} style={{ fontSize: "20px", padding: "10px" }}>🏠</button>
      <h1>Papers Work</h1>

      <div style={{ marginBottom: "20px" }}>
        {classes.map(cls => (
          <button key={cls} onClick={() => { setSelectedClass(cls); setSelectedGroup(null); setSelectedSubject(null); }} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedClass === cls ? "#007bff" : "#ddd", color: selectedClass === cls ? "white" : "black", border: "none", borderRadius: "5px" }}>
            Class {cls}
          </button>
        ))}
      </div>

      {["11", "12"].includes(selectedClass) && (
        <div style={{ marginBottom: "20px" }}>
          {groups[selectedClass].map(group => (
            <button key={group} onClick={() => { setSelectedGroup(group); setSelectedSubject(null); }} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedGroup === group ? "#28a745" : "#ddd", color: selectedGroup === group ? "white" : "black", border: "none", borderRadius: "5px" }}>
              {group}
            </button>
          ))}
        </div>
      )}

      {selectedClass && (
        <div style={{ marginBottom: "20px" }}>
          {getSubjects().map(subject => (
            <button key={subject} onClick={() => setSelectedSubject(subject)} style={{ padding: "10px 15px", margin: "5px", backgroundColor: selectedSubject === subject ? "#ffc107" : "#ddd", color: selectedSubject === subject ? "black" : "black", border: "none", borderRadius: "5px" }}>
              {subject}
            </button>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div style={{ marginBottom: "20px" }}>
          {paperTypes.map(type => (
            <button key={type} style={{ padding: "10px 15px", margin: "5px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}>
              {type}
            </button>
          ))}
        </div>
      )}

      {loading ? <p>Loading...</p> : papers.length > 0 ? (
        <div>
          {papers.map((paper, idx) => (
            <div key={idx} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px auto", maxWidth: "500px", borderRadius: "5px" }}>
              <h3>{paper.title}</h3>
              <p>{paper.type}</p>
            </div>
          ))}
        </div>
      ) : <p>Koi papers nahi</p>}
    </div>
  );
};

export default PapersWork;