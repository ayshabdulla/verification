import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");

     //useLocation = receive data sent from the previous page.
    const location = useLocation();
    const navigate = useNavigate();

    //Email received from login page
    const email = location.state?.email;

    //If user opens this page directly, redirect back to login 
    if (!email) {
        navigate("/");
    }

    const handleForgotPassword = async () => {
        try {
            await axios.post("http://localhost:5000/api/verify-otp", {
                email,
                otp,
            });

            alert("OTP Verified");

            //Navigate to reset password page
            navigate("/reset-password", {state: {email } });
            
        } catch (error) {
            console.error("OTP verification failrd", error);
            alert("Invalid or expired OTP");
        }
    };


  return (
    <div>
      <h2>Verify OTP</h2>

      <p>Enter the OTP sent to <b>{email}</b></p>

      <input placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
       />

       <br /><br />

       <button onClick={handleForgotPassword}>Verify OTP</button>

    </div>
  );
}

export default VerifyOtp;
