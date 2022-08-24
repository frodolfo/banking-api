const express = require('express');
const logger = require('morgan');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(routes);
APP.use(logger('dev'));

APP.listen(PORT, () => {
  console.log(`Onward Banking API server is running on port ${PORT}`);
});
