const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(routes);

if (process.env.NODE_ENV !== 'test') {
  APP.use(logger('dev'));
}

// error handlers

// development error handler
if (APP.get('env') === 'development') {
  APP.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
APP.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

const options = {
  explorer: true,
};

APP.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

APP.listen(PORT, () => {
  console.log(`Onward Banking API server is running on port ${PORT}`);
});
