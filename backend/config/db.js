const dotenv = require("dotenv");
const mongoose = require('mongoose');
const { logEvents } = require('../middleware/logger');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline.bold);

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    })

  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;