const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

const config = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  nodeENV: process.env.NODE_ENV,
};

module.exports = config;
