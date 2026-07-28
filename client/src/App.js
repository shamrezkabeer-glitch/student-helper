import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PapersWork from "./pages/PapersWork";
import LatestNews from "./pages/LatestNews";
import Practice from "./pages/Practice";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/papers-work" element={<PapersWork />} />
        <Route path="/latest-news" element={<LatestNews />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={isAdminLoggedIn ? <Admin /> : <Navigate to="/admin-login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;