// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

describe('Testing Accounts', () => {
  /*
   * Test the GET Routes
   */
  describe('/GET Accounts', () => {
    it('returns all accounts, limited to 10 per page by default', async () => {
      const response = await request(app)
        .get('/api/v1/accounts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).to.be.a('object');
      expect(response.body.data).to.be.a('array');
      // It's okay if there are no accounts available
      expect(response.body.data.length).to.gte(0);
    });
  });

  //   describe('/GET Customer by name', () => {
  //     it('Retrieves a customer by name', async () => {
  //       const response1 = await request(app)
  //         .get('/api/v1/customers')
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(200);

  //       expect(response1.body).to.be.a('object');
  //       expect(response1.body.data).to.be.a('array');
  //       // Enure the array is not empty
  //       expect(response1.body.data.length).to.be.gt(0);

  //       // Get the name of first customer in the array
  //       const customerName = response1.body.data[0].name;

  //       const response2 = await request(app)
  //         .get(`/api/v1/customers/names/${customerName}`)
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(200);

  //       expect(response2.body).to.be.a('object');
  //       expect(response2.body.data).to.be.a('object');
  //       expect(response2.body.data.name).to.be.equal(`${customerName}`);
  //     });
  //   });

  //   describe('/GET Customer by ID', () => {
  //     it('Retrieves a customer by ID', async () => {
  //       const response1 = await request(app)
  //         .get('/api/v1/customers')
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(200);

  //       expect(response1.body).to.be.a('object');
  //       expect(response1.body.data).to.be.a('array');
  //       // Enure the array is not empty
  //       expect(response1.body.data.length).to.be.gt(0);

  //       // Get the ID of first customer in the array
  //       const customerId = response1.body.data[0].id;

  //       const response2 = await request(app)
  //         .get(`/api/v1/customers/ids/${customerId}`)
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(200);

  //       expect(response2.body).to.be.a('object');
  //       expect(response2.body.data).to.be.a('object');
  //       expect(response2.body.data.id).to.be.equal(`${customerId}`);
  //     });
  //   });

  /**
   * Test POST route
   */
  //   describe('/POST Customers', () => {
  //     it('Creates a new customer', async () => {
  //       const response = await request(app)
  //         .post('/api/v1/customers')
  //         .send({ name: 'Freddie Rodolfo' })
  //         .expect('Content-Type', /json/)
  //         .expect(200);

  //       expect(response.body).to.be.a('object');
  //       expect(response.body.data).to.be.a('object');
  //       expect(response.body.data).to.be.a('object');
  //       expect(response.body.data.name).to.be.equal('Freddie Rodolfo');
  //     });
  //   });
});
