import axios from 'axios';
import React, { useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    //Email received from verify OTP page
    const email = location.state?.email;

    //If user tries to open directly without OTP, redirect 
    if (!email) {
        navigate("/");
    } 

    const handleResetPassword = async() => {
        try {
            await axios.post("http://localhost:5000/api/reset-password", {
                email,
                password
            });

            alert("Password reset successful");
            navigate("/login");

        } catch (error) {
            console.error("Error resetting password", error);
            alert("Failed to reset password");
        }
    };
    
  return (
    <div>
      <h2>Reset Password</h2>

      <p>Reset password for <b>{email}</b></p>

      <input type="password"
       placeholder="Enter new password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />

        <br /><br />

        <button onClick={handleResetPassword}>
            Reset Password
        </button>
    </div>
  )
}

export default ResetPassword;
