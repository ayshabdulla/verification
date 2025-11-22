const mongoose = require('mongoose')

function Runserver(){
try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('mongoDB connected!!')
} catch (error) {
    console.log('not connected')
    }
}

module.exports = Runserver;