//routes/authRoutes.js
const express = require('express')
const router = express.Router();

const{
    register,
    forgotPassword,
    verifyOtp,
    resetPassword,
    login 
} = require('../Controller/userCtrl');

//REGISTER
router.post('/register', register);

//SEND OTP
router.post('/forgot-password', forgotPassword);

//VERIFY OTP
router.post('/verify-otp', verifyOtp);

//RESET PASSWORD AFTER OTP VERIFIED
router.post('/reset-password', resetPassword);

//LOGIN
router.post('/login', login );

module.exports = router;