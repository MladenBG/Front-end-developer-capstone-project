import React, { useState } from "react";
import "./Login.css"; // import the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No registered user found. Please register first.");
      return;
    }

    // Check credentials
    if (storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <section className="form">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
