const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const userModel = require("../Model/user");


//Email Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//Register User
exports.register = async (req, res) => {
    const { userName, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    await userModel.create({userName, email, password: hashed });

    res.send('User registered');
};

//FORGOT PASSWORD -SEND OTP
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.send("If user exists, OTP sent");

    //Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`
    });

    res.send("OTP sent");
};

//VERIFY OTP
exports.verifyOtp = async ( req, res) => {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send('Invalid email');

    if (user.otp !== otp) return res.status(400).send("Invalid OTP");

    if (user.otpExpiry < Date.now())
        return res.status(400).send("OTP expired");

    res.send("OTP verified");
};

//RESET PASSWORD AFTER OTP VERIFIED
exports.resetPassword = async (req, res)=> {
    const { email,password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.send("Password reset successful");
};

//LOGIN USER
exports.login = async ( req, res) => {
    const { email,password } = req.body;

    const user = await userModel.findOne({ email });
    if(!user) return res.status(400).send("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password");

    res.send("Login successful");

};