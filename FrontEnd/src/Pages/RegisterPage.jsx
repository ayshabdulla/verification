//src/pages/RegisterPage.js
import React, { useState } from "react";

import './RegisterPage.css';


import axios from 'axios'
import { useNavigate } from 'react-router-dom';//import useNavigate

function RegisterPage(){
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); //Initialize useNavigate

    const handleRegister = async() =>{
        try {
            //Send POST request to backend for registration
            await axios.post('https://verification-ymz3.onrender.com/api/register',{ userName, email, password});
            alert('User registered successfully')

            //After successful registration,redirect to the login page
            navigate('/login'); 
        } catch (error) {
            console.error('Error during registration',error);
            alert('Registration failed');
        }
    };

    return(
        <div className="register-container">
            <h2>Register</h2>
            <input
            placeholder="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            
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
            <button onClick={handleRegister}>Register</button>

        </div>
    );
}

export default RegisterPage;