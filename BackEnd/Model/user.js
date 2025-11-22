//model/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    otp:String,
    otpExpiry:Date
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;