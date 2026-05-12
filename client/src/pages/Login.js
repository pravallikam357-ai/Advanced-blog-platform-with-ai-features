import { useState } from "react";
import axios from "axios";

// Backend URL
axios.defaults.baseURL = "http://localhost:5000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log("Response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");

    } catch (err) {
      console.error("Error:", err.response?.data);
      alert(err.response?.data || "Login Failed ❌");
    }
  };

  return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Login</h3>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;