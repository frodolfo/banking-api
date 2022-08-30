const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

const config = {
  info: {
    version: '1.0,0',
    title: 'Onward Banking API',
    description: 'REST API documentation', // by default: ''
  },
  host: process.env.SWAGGER_HOST || 'localhost:3001', // by default: 'localhost:3000'
  basePath: '/api/v1/',
};

swaggerAutogen(outputFile, endpointsFiles, config);
