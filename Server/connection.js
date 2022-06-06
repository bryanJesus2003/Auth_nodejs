const mongoose = require('mongoose')
require('dotenv').config();   

/// Method to connect to MongoDB
const connection = () => {
         mongoose.connect(process.env.MONGO_DB_URL)
            .then(() => console.log("Connected to MongoDB"))
            .catch(err => console.log("Error connecting to MongoDB" , err))
}

module.exports = connection