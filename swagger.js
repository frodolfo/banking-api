const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

const config = {
  info: {
    version: '1.0.0',
    title: 'Onward Banking API',
    description:
      'This is a basic CRUD API application with Express and documented with Swagger',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Fred Rodolfo',
      url: 'https://www.linkedin.com/in/fredrodolfo/',
      email: 'fred.rodolfo@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/docs',
    },
  ],
  host: process.env.SWAGGER_HOST || 'localhost:3001', // by default: 'localhost:3000'
  basePath: '',
};

swaggerAutogen(outputFile, endpointsFiles, config);
