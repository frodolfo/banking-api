// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

describe('Testing Customers', () => {
  //   before((done) => {
  //     knex.migrate
  //       .latest(config.test)
  //       .then(() => {
  //         return knex.seed.run();
  //       })
  //       .then(() => done())
  //       .catch(done);
  //   });

  /*
   * Test the GET Routes
   */
  describe('/GET Customers', () => {
    it('returns all customers, limited to 10 per page by default', async () => {
      const response = await request(app)
        .get('/api/v1/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).to.be.a('object');
      expect(response.body.data).to.be.a('array');
      expect(response.body.data.length).to.above(0);
    });
  });

  describe('/GET Customer by name', () => {
    it('Retrieves a customer by name', async () => {
      const response1 = await request(app)
        .get('/api/v1/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response1.body).to.be.a('object');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the name of first customer in the array
      const customerName = response1.body.data[0].name;

      const response2 = await request(app)
        .get(`/api/v1/customers/names/${customerName}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response2.body).to.be.a('object');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data.name).to.be.equal(`${customerName}`);
    });
  });

  describe('/GET Customer by ID', () => {
    it('Retrieves a customer by ID', async () => {
      const response1 = await request(app)
        .get('/api/v1/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response1.body).to.be.a('object');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the ID of first customer in the array
      const customerId = response1.body.data[0].id;

      const response2 = await request(app)
        .get(`/api/v1/customers/ids/${customerId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response2.body).to.be.a('object');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data.id).to.be.equal(`${customerId}`);
    });
  });

  /**
   * Test POST route
   */
  describe('/POST Customers', () => {
    it('Creates a new customer', async () => {
      const response = await request(app)
        .post('/api/v1/customers')
        .send({ name: 'Freddie Rodolfo' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).to.be.a('object');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.name).to.be.equal('Freddie Rodolfo');
    });
  });

  /**
   * Test PATCH route
   */
  describe('/PATCH Customer name by ID', () => {
    it("updates a customer's name by ID", async () => {
      const response1 = await request(app)
        .get('/api/v1/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response1.body).to.be.a('object');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the ID of first customer in the array
      const customerId = response1.body.data[0].id;
      const newCustomerName = 'John Doe';

      const response2 = await request(app)
        .patch(`/api/v1/customers/ids/${customerId}`)
        .send({ name: `${newCustomerName}` })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response2.body).to.be.a('object');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data.id).to.be.equal(`${customerId}`);
      expect(response2.body.data.name).to.be.equal(`${newCustomerName}`);
    });
  });

  /**
   * Test DELETE route
   */
  describe('/DELETE Customer by ID', () => {
    it('delete a customer by its ID', async () => {
      const response1 = await request(app)
        .get('/api/v1/customers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response1.body).to.be.a('object');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the ID of first customer in the array
      const customerId = response1.body.data[0].id;

      const response2 = await request(app)
        .delete(`/api/v1/customers/ids/${customerId}`)
        .set('Accept', 'application/json')
        .expect(200);

      expect(response2.body).to.be.a('object');
      expect(JSON.parse(response2.text)).to.be.a('object');
      expect(JSON.parse(response2.text).status).to.be.eq('Success');
      expect(JSON.parse(response2.text).message).to.contains(`${customerId}`);
    });
  });
});
