import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <Router>

      {/* 🔥 Navigation Menu */}
      <nav className="navbar navbar-dark bg-dark px-3">
  <span className="navbar-brand">Blog App</span>

  <div>
    <Link to="/" className="btn btn-light me-2">Home</Link>
    <Link to="/login" className="btn btn-light me-2">Login</Link>
    <Link to="/create" className="btn btn-warning me-2">Create</Link>

    <button
      className="btn btn-danger"
      onClick={() => {
        localStorage.clear();
        alert("Logged out");
      }}
    >
      Logout
    </button>
  </div>
</nav>

      {/* 🔥 Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>

    </Router>
  );
}

export default App;