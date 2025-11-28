import React, { useState } from "react";
import "./Register.css"; // import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);

    // Password validation
    const hasMinLength = password.length >= 5;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!validEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!hasMinLength) {
      alert("Password must be at least 5 characters long.");
      return;
    }
    if (!hasSpecialChar) {
      alert("Password must include at least one special character.");
      return;
    }
    if (!city || !country) {
      alert("Please enter both city and country.");
      return;
    }

    // Save user data in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ email, username, password, city, country })
    );

    alert("Registration successful!");
  };

  return (
    <section className="form">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="two-column">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
