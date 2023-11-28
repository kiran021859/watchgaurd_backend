const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {

  const url = process.env.MONGO_URI;

  if (!url) {
    console.error('MongoDB URI not found in .env file');
    process.exit(1);
  }

  return mongoose.connect(url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB