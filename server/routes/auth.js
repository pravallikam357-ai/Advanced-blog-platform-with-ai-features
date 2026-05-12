const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    console.log("Users:", users); // debug

    res.status(201).json("User registered successfully ✅");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("Login hit:", req.body);

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, "secretkey");

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;