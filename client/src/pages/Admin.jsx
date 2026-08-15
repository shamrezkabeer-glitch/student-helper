import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("news");
  
  const [newsForm, setNewsForm] = useState({ class: "9", category: "Results", title: "", date: "", imageUrl: "" });
  const [papersForm, setPapersForm] = useState({ class: "9", group: "", subject: "Computer", type: "Notes", fileUrl: "", title: "" });
  const [questionsForm, setQuestionsForm] = useState({ class: "9", subject: "Physics", chapter: "Chapter 1", question: "", solution: "" });
  
  const [newsList, setNewsList] = useState([]);
  const [papersList, setPapersList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchClass, setSearchClass] = useState("");
  const [uploadingNews, setUploadingNews] = useState(false);
  const [uploadingPapers, setUploadingPapers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
const news = await axios.get("https://student-helper-production-c02d.up.railway.app/api/news");
const papers = await axios.get("https://student-helper-production-c02d.up.railway.app/api/papers");
const questions = await axios.get("https://student-helper-production-c02d.up.railway.app/api/questions");
      
      setNewsList(news.data);
      setPapersList(papers.data);
      setQuestionsList(questions.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // UPLOAD FUNCTION
  const handleUploadFile = async (file, setUrl, type) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://student-helper-production-c02d.up.railway.app/api/papers/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`${type} upload ho gaya!`);
      setUrl(response.data.url);
      return response.data.url;
    } catch (error) {
      alert("Upload fail: " + error.message);
      return null;
    }
  };

  // FILTER FUNCTIONS
  const getFilteredNews = () => {
    if (!searchClass) return newsList;
    return newsList.filter(item => item.class === searchClass);
  };

  const getFilteredPapers = () => {
    if (!searchClass) return papersList;
    return papersList.filter(item => item.class === searchClass);
  };

  const getFilteredQuestions = () => {
    if (!searchClass) return questionsList;
    return questionsList.filter(item => item.class === searchClass);
  };

  // NEWS FUNCTIONS
  const handleAddNews = async () => {
    if (!newsForm.title || !newsForm.date) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://student-helper-production-c02d.up.railway.app/api/news", newsForm);
      alert("News add ho gaya!");
      setNewsForm({ class: "9", category: "Results", title: "", date: "", imageUrl: "" });
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleEditNews = (item) => {
    setEditingId(item._id);
    setEditForm(item);
  };

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.date) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`https://student-helper-production-c02d.up.railway.app/api/news/${editingId}`, editForm);
      alert("News update ho gaya!");
      setEditingId(null);
      setEditForm({});
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Delete karna hai?")) {
      try {
        await axios.delete(`student-helper-production-c02d.up.railway.app/api/news/${id}`);
        alert("News delete ho gaya!");
        fetchAllData();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  // PAPERS FUNCTIONS
  const handleAddPapers = async () => {
    if (!papersForm.subject || !papersForm.title || !papersForm.fileUrl) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://student-helper-production-c02d.up.railway.app/api/papers", papersForm);
      alert("Paper add ho gaya!");
      setPapersForm({ class: "9", group: "", subject: "Computer", type: "Notes", fileUrl: "", title: "" });
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleEditPapers = (item) => {
    setEditingId(item._id);
    setEditForm(item);
  };

  const handleSaveEditPapers = async () => {
    if (!editForm.subject || !editForm.title || !editForm.fileUrl) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`https://student-helper-production-c02d.up.railway.app/api/papers/${editingId}`, editForm);
      alert("Paper update ho gaya!");
      setEditingId(null);
      setEditForm({});
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDeletePapers = async (id) => {
    if (window.confirm("Delete karna hai?")) {
      try {
        await axios.delete(`student-helper-production-c02d.up.railway.app/api/papers/${id}`);
        alert("Paper delete ho gaya!");
        fetchAllData();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  // QUESTIONS FUNCTIONS
  const handleAddQuestions = async () => {
    if (!questionsForm.question || !questionsForm.solution) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("student-helper-production-c02d.up.railway.app/api/questions", questionsForm);
      alert("Question add ho gaya!");
      setQuestionsForm({ class: "9", subject: "Physics", chapter: "Chapter 1", question: "", solution: "" });
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleEditQuestions = (item) => {
    setEditingId(item._id);
    setEditForm(item);
  };

  const handleSaveEditQuestions = async () => {
    if (!editForm.question || !editForm.solution) {
      alert("Sab fields bharo!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`https://student-helper-production-c02d.up.railway.app/api/questions/${editingId}`, editForm);
      alert("Question update ho gaya!");
      setEditingId(null);
      setEditForm({});
      fetchAllData();
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDeleteQuestions = async (id) => {
    if (window.confirm("Delete karna hai?")) {
      try {
        await axios.delete(`student-helper-production-c02d.up.railway.app/api/questions/${id}`);
        alert("Question delete ho gaya!");
        fetchAllData();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };
return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={() => navigate("/")} style={{ fontSize: "20px", padding: "10px" }}>🏠</button>
        <h1 style={{ margin: "0" }}>Admin Panel</h1>
        <button 
          onClick={() => {
            localStorage.removeItem("adminLoggedIn");
            navigate("/admin-login");
          }}
          style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "20px", borderBottom: "2px solid #ddd" }}>
        <button onClick={() => setActiveTab("news")} style={{ padding: "10px 20px", backgroundColor: activeTab === "news" ? "#007bff" : "#ddd", color: activeTab === "news" ? "white" : "black", border: "none", cursor: "pointer" }}>News</button>
        <button onClick={() => setActiveTab("papers")} style={{ padding: "10px 20px", backgroundColor: activeTab === "papers" ? "#007bff" : "#ddd", color: activeTab === "papers" ? "white" : "black", border: "none", cursor: "pointer" }}>Papers</button>
        <button onClick={() => setActiveTab("questions")} style={{ padding: "10px 20px", backgroundColor: activeTab === "questions" ? "#007bff" : "#ddd", color: activeTab === "questions" ? "white" : "black", border: "none", cursor: "pointer" }}>Questions</button>
      </div>

      {/* NEWS TAB */}
      {activeTab === "news" && (
        <div>
          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
            <h2>Add News</h2>
            <input type="text" placeholder="Class" value={newsForm.class} onChange={(e) => setNewsForm({...newsForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <select value={newsForm.category} onChange={(e) => setNewsForm({...newsForm, category: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}>
              <option>Results</option>
              <option>Admissions</option>
              <option>Deadlines</option>
            </select>
            <input type="text" placeholder="Title" value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input type="text" placeholder="Date" value={newsForm.date} onChange={(e) => setNewsForm({...newsForm, date: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            
            {/* IMAGE URL INPUT */}
<div style={{ marginBottom: "10px" }}>
  <input 
    type="text"
    placeholder="Image URL (paste link here)"
    value={newsForm.imageUrl}
    onChange={(e) => setNewsForm({...newsForm, imageUrl: e.target.value})}
    style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
  />
  <small style={{ color: "#666" }}>Paste Google Drive image link or any image URL</small>
</div>
            
            <button onClick={handleAddNews} disabled={loading || uploadingNews} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              {loading ? "Adding..." : uploadingNews ? "Uploading..." : "Add News"}
            </button>
          </div>

          {editingId && activeTab === "news" && (
            <div style={{ border: "2px solid #ffc107", padding: "20px", borderRadius: "5px", marginBottom: "20px", backgroundColor: "#fff8e1" }}>
              <h2>Edit News</h2>
              <input type="text" placeholder="Class" value={editForm.class || ""} onChange={(e) => setEditForm({...editForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input 
  type="text" 
  placeholder="Image URL" 
  value={editForm.imageUrl || ""} 
  onChange={(e) => setEditForm({...editForm, imageUrl: e.target.value})} 
  style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} 
/>
              <select value={editForm.category || ""} onChange={(e) => setEditForm({...editForm, category: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}>
                <option>Results</option>
                <option>Admissions</option>
                <option>Deadlines</option>
              </select>
              <input type="text" placeholder="Title" value={editForm.title || ""} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Date" value={editForm.date || ""} onChange={(e) => setEditForm({...editForm, date: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSaveEdit} disabled={loading} style={{ flex: 1, padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  {loading ? "Saving..." : "Save Edit"}
                </button>
                <button onClick={() => setEditingId(null)} style={{ flex: 1, padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
            <input 
              type="text" 
              placeholder="Filter by class (9, 10, 11, 12)" 
              value={searchClass} 
              onChange={(e) => setSearchClass(e.target.value)}
              style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
            <h2>All News ({getFilteredNews().length})</h2>
            {getFilteredNews().length > 0 ? (
              getFilteredNews().map((item) => (
                <div key={item._id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>Class: {item.class} | {item.category} | {item.date}</p>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button onClick={() => handleEditNews(item)} style={{ padding: "8px 15px", backgroundColor: "#ffc107", color: "black", border: "none", cursor: "pointer", borderRadius: "5px" }}>Edit</button>
                    <button onClick={() => handleDeleteNews(item._id)} style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Koi news nahi</p>
            )}
          </div>
        </div>
      )}

      {/* PAPERS TAB */}
      {activeTab === "papers" && (
        <div>
          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
            <h2>Add Papers</h2>
            <input type="text" placeholder="Class" value={papersForm.class} onChange={(e) => setPapersForm({...papersForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input type="text" placeholder="Group" value={papersForm.group} onChange={(e) => setPapersForm({...papersForm, group: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input type="text" placeholder="Subject" value={papersForm.subject} onChange={(e) => setPapersForm({...papersForm, subject: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <select value={papersForm.type} onChange={(e) => setPapersForm({...papersForm, type: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}>
              <option>Notes</option>
              <option>Past Paper</option>
              <option>Model Paper</option>
              <option>Guess Paper</option>
            </select>
            
            {/* FILE UPLOAD FOR PAPERS */}
            <div style={{ marginBottom: "10px" }}>
              <input 
                type="file" 
                id="papersFile"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setUploadingPapers(true);
                    handleUploadFile(e.target.files[0], (url) => setPapersForm({...papersForm, fileUrl: url}), "Paper")
                      .then(() => setUploadingPapers(false));
                  }
                }}
                style={{ width: "100%", padding: "10px" }}
                accept="application/pdf"
              />
              <small style={{ color: "#666" }}>Upload PDF file</small>
            </div>
            {papersForm.fileUrl && <p style={{ color: "green", fontSize: "12px" }}>✓ File uploaded</p>}
            
            <input type="text" placeholder="Title" value={papersForm.title} onChange={(e) => setPapersForm({...papersForm, title: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <button onClick={handleAddPapers} disabled={loading || uploadingPapers} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              {loading ? "Adding..." : uploadingPapers ? "Uploading..." : "Add Paper"}
            </button>
          </div>

          {editingId && activeTab === "papers" && (
            <div style={{ border: "2px solid #ffc107", padding: "20px", borderRadius: "5px", marginBottom: "20px", backgroundColor: "#fff8e1" }}>
              <h2>Edit Paper</h2>
              <input type="text" placeholder="Class" value={editForm.class || ""} onChange={(e) => setEditForm({...editForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Group" value={editForm.group || ""} onChange={(e) => setEditForm({...editForm, group: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Subject" value={editForm.subject || ""} onChange={(e) => setEditForm({...editForm, subject: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <select value={editForm.type || ""} onChange={(e) => setEditForm({...editForm, type: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}>
                <option>Notes</option>
                <option>Past Paper</option>
                <option>Model Paper</option>
                <option>Guess Paper</option>
              </select>
              <input type="text" placeholder="File URL" value={editForm.fileUrl || ""} onChange={(e) => setEditForm({...editForm, fileUrl: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Title" value={editForm.title || ""} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSaveEditPapers} disabled={loading} style={{ flex: 1, padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  {loading ? "Saving..." : "Save Edit"}
                </button>
                <button onClick={() => setEditingId(null)} style={{ flex: 1, padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
            <input 
              type="text" 
              placeholder="Filter by class (9, 10, 11, 12)" 
              value={searchClass} 
              onChange={(e) => setSearchClass(e.target.value)}
              style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
            <h2>All Papers ({getFilteredPapers().length})</h2>
            {getFilteredPapers().length > 0 ? (
              getFilteredPapers().map((item) => (
                <div key={item._id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>Class: {item.class} | {item.subject} | {item.type}</p>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button onClick={() => handleEditPapers(item)} style={{ padding: "8px 15px", backgroundColor: "#ffc107", color: "black", border: "none", cursor: "pointer", borderRadius: "5px" }}>Edit</button>
                    <button onClick={() => handleDeletePapers(item._id)} style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Koi papers nahi</p>
            )}
          </div>
        </div>
      )}

      {/* QUESTIONS TAB */}
      {activeTab === "questions" && (
        <div>
          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
            <h2>Add Questions</h2>
            <input type="text" placeholder="Class" value={questionsForm.class} onChange={(e) => setQuestionsForm({...questionsForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input type="text" placeholder="Subject" value={questionsForm.subject} onChange={(e) => setQuestionsForm({...questionsForm, subject: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input type="text" placeholder="Chapter" value={questionsForm.chapter} onChange={(e) => setQuestionsForm({...questionsForm, chapter: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
            <textarea placeholder="Question" value={questionsForm.question} onChange={(e) => setQuestionsForm({...questionsForm, question: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box", height: "80px" }} />
            <textarea placeholder="Solution" value={questionsForm.solution} onChange={(e) => setQuestionsForm({...questionsForm, solution: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box", height: "100px" }} />
            <button onClick={handleAddQuestions} disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              {loading ? "Adding..." : "Add Question"}
            </button>
          </div>

          {editingId && activeTab === "questions" && (
            <div style={{ border: "2px solid #ffc107", padding: "20px", borderRadius: "5px", marginBottom: "20px", backgroundColor: "#fff8e1" }}>
              <h2>Edit Question</h2>
              <input type="text" placeholder="Class" value={editForm.class || ""} onChange={(e) => setEditForm({...editForm, class: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Subject" value={editForm.subject || ""} onChange={(e) => setEditForm({...editForm, subject: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <input type="text" placeholder="Chapter" value={editForm.chapter || ""} onChange={(e) => setEditForm({...editForm, chapter: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }} />
              <textarea placeholder="Question" value={editForm.question || ""} onChange={(e) => setEditForm({...editForm, question: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box", height: "80px" }} />
              <textarea placeholder="Solution" value={editForm.solution || ""} onChange={(e) => setEditForm({...editForm, solution: e.target.value})} style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box", height: "100px" }} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleSaveEditQuestions} disabled={loading} style={{ flex: 1, padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  {loading ? "Saving..." : "Save Edit"}
                </button>
                <button onClick={() => setEditingId(null)} style={{ flex: 1, padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
            <input 
              type="text" 
              placeholder="Filter by class (9, 10, 11, 12)" 
              value={searchClass} 
              onChange={(e) => setSearchClass(e.target.value)}
              style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
            <h2>All Questions ({getFilteredQuestions().length})</h2>
            {getFilteredQuestions().length > 0 ? (
              getFilteredQuestions().map((item) => (
                <div key={item._id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h4>{item.question}</h4>
                      <p>Class: {item.class} | {item.subject} | {item.chapter}</p>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button onClick={() => handleEditQuestions(item)} style={{ padding: "8px 15px", backgroundColor: "#ffc107", color: "black", border: "none", cursor: "pointer", borderRadius: "5px" }}>Edit</button>
                      <button onClick={() => handleDeleteQuestions(item._id)} style={{ padding: "8px 15px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Koi questions nahi</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;