const config = require('./config/index');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbConnect = require('./config/database');
const globalErrorMiddleware = require('./middlewares/globalError.middleware');
const router = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/api', router);

app.use((req, res) => {
  res.json({ message: `inserted url is invalid: ${req.originalUrl}` });
});

app.use(globalErrorMiddleware);

dbConnect().then(() => {
  app.listen(config.port, () => {
    console.log(`Listening to http://localhost:${config.port}`);
  });
});
