const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const routes = require('./routes');

const APP = express();

// const whitelist = ['my.domain.com']; // change this to specific hosts
const corsOptions = {
  // origin: (origin, callback) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error());
  //   }
  // },
  origin: '*', // allow everyone by default
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
};

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(helmet());
APP.use(cors(corsOptions));
APP.use(routes);

if (process.env.NODE_ENV !== 'test') {
  APP.use(logger('dev'));
}

// **** Error Handlers ****
// Development error handler
if (APP.get('env') === 'development') {
  APP.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
APP.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

// Swagger Documentation
const options = {
  explorer: true,
};

APP.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

module.exports = APP;
