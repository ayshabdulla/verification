import React from 'react'

import { Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import VerifyOtp from './Pages/VerifyOtp';

import RegisterPage from './Pages/RegisterPage';
import Home from './Pages/Home';
import ResetPassword from './Pages/ResetPassword';



const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<RegisterPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
