//src/pages/Loginpage.js
import React, { useState } from 'react'

import './Login.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //----------------------------------------------
    //LOGIN FUNCTION
    //----------------------------------------------

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "https://verification-ymz3.onrender.com/api/login",
                { email, password }
            );

            
            alert("Login successful");
            navigate("/home")
        } catch (error) {
            alert(error.response?.data || "Failed to login");
            console.log(error.response?.data);

        }
    };

    //---------------------------------------------
    //FORGOT PASSWORD FUNCTION (SEND OTP)
    //---------------------------------------------

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email first");
            return;
        }
        try {
            await axios.post("https://verification-ymz3.onrender.com/api/forgot-password", {
                email,
            });

            alert("OTP sent to your email");

            //Navigate to OTP verification page and pass the email
            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            console.error("Failed to send OTP", error);
            alert("Failed to send OTP");
        }
    };



    return (
        <div className="login-container">

            <h2>Login</h2>
            <input
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
            <button onClick={handleLogin}>Login</button>
            <br /><br />

            {/* FORGET PASSWORD BUTTON  */}
            <button
                onClick={handleForgotPassword}
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
            >
                Forgot Password?
            </button>


        </div>
    );
}

export default Login
