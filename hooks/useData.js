const request = require('supertest');
const expect = require('chai').expect;

const getCustomers = async (app) => {
  const response = await request(app)
    .get('/api/v1/customers')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

  return response;
};

const getAccounts = async (app) => {
  const response = await request(app)
    .get('/api/v1/accounts')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

  return response;
};

const getTransactions = async (app) => {
  const response = await request(app)
    .get('/api/v1/transactions')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

  return response;
};

module.exports = {
  getAccounts,
  getCustomers,
  getTransactions,
};
