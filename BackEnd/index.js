require('dotenv').config()
const express = require('express')
const Runserver = require("./Database/connection");
const cors = require('cors');
const router = require('./Routes/userRoutes');
const { connection, connect } = require('mongoose');

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())


//Routes
app.use('/api',router);

Runserver()

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})