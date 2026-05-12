const router = require("express").Router();
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");

// helper functions
const getData = async () => await fs.readJSON("data.json");
const saveData = async (data) => await fs.writeJSON("data.json", data);

// ✅ CREATE BLOG
router.post("/", async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json("No token");

    const decoded = jwt.verify(token, "secretkey");

    const data = await getData();

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image,
      userId: decoded.id,
      username: "User",
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    data.blogs.push(newBlog);
    await saveData(data);

    res.json("Blog created");
  } catch (err) {
    res.status(500).json("Create failed");
  }
});

// ✅ GET BLOGS
router.get("/", async (req, res) => {
  const data = await getData();
  res.json(data.blogs);
});

// ✅ DELETE BLOG
router.delete("/:id", async (req, res) => {
  const data = await getData();

  data.blogs = data.blogs.filter(
    (b) => String(b.id) !== req.params.id
  );

  await saveData(data);
  res.json("Deleted");
});

// ✅ UPDATE BLOG
router.put("/:id", async (req, res) => {
  const data = await getData();

  const blog = data.blogs.find(
    (b) => String(b.id) === req.params.id
  );

  if (!blog) return res.status(404).json("Blog not found");

  blog.title = req.body.title;
  blog.content = req.body.content;

  await saveData(data);
  res.json("Updated");
});

// ✅ LIKE
router.put("/like/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "secretkey");

    const data = await getData();
    const blog = data.blogs.find(
      (b) => String(b.id) === req.params.id
    );

    if (!blog.likes) blog.likes = [];

    const alreadyLiked = blog.likes.includes(decoded.id);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id !== decoded.id);
    } else {
      blog.likes.push(decoded.id);
    }

    await saveData(data);
    res.json("Like updated");
  } catch {
    res.status(500).json("Like failed");
  }
});

// ✅ COMMENT
router.post("/comment/:id", async (req, res) => {
  const data = await getData();

  const blog = data.blogs.find(
    (b) => String(b.id) === req.params.id
  );

  if (!blog.comments) blog.comments = [];

  blog.comments.push({
    id: Date.now(),
    text: req.body.text
  });

  await saveData(data);
  res.json("Comment added");
});

module.exports = router;