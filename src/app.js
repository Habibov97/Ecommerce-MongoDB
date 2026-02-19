const config = require('./config/index');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbConnect = require('./config/database');
const globalErrorMiddleware = require('./middlewares/globalError.middleware');

const app = express();

app.use(express.json());
app.use(cors());
const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

// app.get('/api', router);

app.use(globalErrorMiddleware);

dbConnect().then(() => {
  app.listen(config.port, () => {
    console.log(`Listening to http://localhost:${config.port}`);
  });
});
