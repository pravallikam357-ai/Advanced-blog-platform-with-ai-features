import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showHeart, setShowHeart] = useState(null);

  // ✅ FETCH BLOGS
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    fetchBlogs();
  };

  // ✅ EDIT
  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };
  const handleDoubleClick = async (id) => {
  setShowHeart(id);        // show heart

  await handleLike(id);    // like API call

  setTimeout(() => {
    setShowHeart(null);    // hide heart
  }, 600);
};

  // ✅ UPDATE
  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/blogs/${id}`, {
      title: updatedTitle,
      content: updatedContent,
    });

    setEditingId(null);
    fetchBlogs();
  };

  // ✅ LIKE
  const handleLike = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/blogs/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBlogs();
  };

  // ✅ COMMENT
  const handleComment = async (id) => {
    await axios.post(`http://localhost:5000/api/blogs/comment/${id}`, {
      text: commentText,
    });

    setCommentText("");
    fetchBlogs();
  };

  // ⏱ TIME FUNCTION
  const getTimeAgo = (date) => {
    if (!date) return "";

    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">📰 Feed</h3>

      {blogs.map((blog) => {
        const userId = localStorage.getItem("token")
          ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
          : null;

        const liked = blog.likes?.includes(userId);

        return (
          <div key={blog.id} className="card shadow-sm mb-4 border-0">

            <div className="card-body">

              {/* 👤 USER + TIME */}
              <div className="d-flex justify-content-between align-items-center mb-3">

                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      background: "#0d6efd",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px",
                      fontWeight: "bold"
                    }}
                  >
                    {blog.username?.charAt(0).toUpperCase()}
                  </div>

                  <strong>{blog.username || "User"}</strong>
                </div>

                <small className="text-muted" style={{ fontSize: "12px" }}>
                  {getTimeAgo(blog.createdAt)}
                </small>

              </div>

              {/* 🖼 IMAGE */}
              {blog.image && (
  <div
    style={{ position: "relative", cursor: "pointer" }}
    onDoubleClick={() => handleDoubleClick(blog.id)}
  >
    <img
      src={blog.image}
      alt="blog"
      className="img-fluid rounded mb-3"
      style={{
        height: "300px",
        width: "100%",
        objectFit: "cover",
      }}
    />

    {/* ❤️ HEART ANIMATION */}
    {showHeart === blog.id && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "70px",
          color: "white",
          animation: "pop 0.6s ease",
          pointerEvents: "none"
        }}
      >
        ❤️
      </div>
    )}
  </div>
)}

              {/* 📝 CONTENT */}
              <h5 className="fw-bold">{blog.title}</h5>
              <p className="text-muted">{blog.content}</p>

              {/* ❤️ ACTION BAR */}
              <div className="d-flex justify-content-between align-items-center mt-3">

                <div className="d-flex gap-3">
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      color: liked ? "red" : "black",
                    }}
                    onClick={() => handleLike(blog.id)}
                  >
                    ❤️ {blog.likes?.length || 0}
                  </span>

                  <span style={{ fontSize: "18px" }}>
                    💬 {blog.comments?.length || 0}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleEdit(blog)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* ✏️ EDIT */}
              {editingId === blog.id && (
                <div className="mt-3">
                  <input
                    className="form-control mb-2"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUpdate(blog.id)}
                  >
                    Update
                  </button>
                </div>
              )}

              {/* 💬 COMMENTS */}
              <div className="mt-3">
                <h6 className="text-secondary">Comments</h6>

                {blog.comments?.map((c) => (
                  <p key={c.id} className="mb-1">
                    💬 {c.text}
                  </p>
                ))}

                <input
                  className="form-control mt-2"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />

                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => handleComment(blog.id)}
                >
                  Post
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;