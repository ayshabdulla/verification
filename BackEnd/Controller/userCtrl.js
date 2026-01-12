const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const userModel = require("../Model/user");


//Email Setup
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // must be false for port 587
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
});

//Register User
exports.register = async (req, res) => {

    if (!userName || !email || !password) {
    return res.status(400).send("All fields are required");
}

    try {
        const { userName, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await userModel.create({
            userName,
            email,
            password: hashed
        });

        res.status(200).send("User registered");
    } catch (err) {
        res.status(500).send("Registration failed");
    }
};


//FORGOT PASSWORD -SEND OTP
exports.forgotPassword = async (req, res) => {

    if (!email) {
        return res.status(400).send("Email is required");
    }
    try {
        const { email } = req.body;                     

        const user = await userModel.findOne({ email });
        if (!user) return res.send("If user exists, OTP sent");

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            from: "no-reply@brevo.com",
            to: email,
            subject: "Password Reset OTP",
            html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
        });


        res.send("OTP sent successfully");
    } catch (error) {
        console.error("OTP ERROR:", error);
        res.status(500).send("Failed to send OTP");
    }
};


//VERIFY OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send('Invalid email');

    if (user.otp !== otp) return res.status(400).send("Invalid OTP");

    if (user.otpExpire && user.otpExpire > Date.now()) {
    return res.send("OTP already sent. Please wait.");
}

      // ✅ clear OTP after verification
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.send("OTP verified");
};

//RESET PASSWORD AFTER OTP VERIFIED
exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.send("Password reset successful");
};

//LOGIN USER
exports.login = async (req, res) => {

    if (!email || !password) {
    return res.status(400).send("Email and password required");
}


    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).send("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("Invalid password");
    }

    // ✅ Create JWT
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // ✅ Send JWT as cookie
    res.cookie("auth-token", token, {
        httpOnly: true,
        secure: true,      // REQUIRED on Render (HTTPS)
        sameSite: "none",  // REQUIRED for frontend-backend different domains
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).send("Login successful");

};