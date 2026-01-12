require('dotenv').config()
const express = require('express')
const Runserver = require("./Database/connection");
const cors = require('cors');
const router = require('./Routes/userRoutes');
const { connection, connect } = require('mongoose');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cors({
  origin: "https://verification-frontend-zqpd.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Verification API is running 🚀");
});


//Routes
app.use('/api',router);

Runserver()

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})