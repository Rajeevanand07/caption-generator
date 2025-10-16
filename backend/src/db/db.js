require('dotenv').config();
const mongoose = require('mongoose');


function connectDB() {
  const dbURI = process.env.MONGODB_URI;
  mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

module.exports = connectDB;