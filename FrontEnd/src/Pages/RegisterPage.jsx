// src/pages/RegisterPage.js
import React, { useState } from "react";
import './RegisterPage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {

  if (!userName || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    await axios.post(
      "https://verification-ymz3.onrender.com/api/register",
      { userName, email, password }
    );

    alert("User registered successfully");
    navigate("/login");

  } catch (error) {
    console.error("Error during registration:", error.response?.data);
    alert(error.response?.data || "Registration failed");
  }
};


    return (
        <div className="register-container">
            <h2>Register</h2>

            <input
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;
