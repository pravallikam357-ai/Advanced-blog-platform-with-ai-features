import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first ❌");
    return;
  }

  try {
    await axios.post(
  "http://localhost:5000/api/blogs",
  {
    title,
    content,
    image,
    username: user?.name || "User", // ✅ ADD
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    alert("Blog created successfully ✅");

    navigate("/"); // 🔥 redirect to home

  } catch (err) {
    console.log(err);
    alert("Error creating blog ❌");
  }
};
const handleImage = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result); // 🔥 Base64 string
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

  return (
    <div className="container mt-4">
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
  className="form-control mb-2"
  placeholder="Image URL (paste link)"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>
<input
  type="file"
  className="form-control mb-2"
  onChange={(e) => handleImage(e)}
/>

        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;