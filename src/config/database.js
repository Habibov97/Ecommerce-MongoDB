const mongoose = require('mongoose');
const config = require('./index');
const dbConnect = () => {
  return mongoose
    .connect(config.databaseURL)
    .then(() => {
      console.log('Database connected to database');
      return true;
    })
    .catch(() => {
      console.log('Cannot connect to database');
      return false;
    });
};

module.exports = dbConnect;
