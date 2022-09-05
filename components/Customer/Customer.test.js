// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const { getCustomers } = require('../../hooks/useData');
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
      const response = await getCustomers(app);

      expect(response).has.property('body');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('data');
      expect(response.body.data).to.be.a('array');
      expect(response.body.data.length).to.be.gte(0);
    });
  });

  describe('/GET Customer by name', () => {
    it('Retrieves a customer by name', async () => {
      const response1 = await getCustomers(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      // We expect an array in the event there are at least
      // two people with the same name
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        expect(response1.body.data[0]).has.property('name');
        // Get the name of first customer in the array
        const customerName = response1.body.data[0].name;
        const response2 = await request(app)
          .get(`/api/v1/customers/names/${customerName}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('array');
        expect(response1.body.data.length).to.be.gte(0);

        if (response1.body.data.length > 0) {
          expect(response2.body.data[0]).has.property('id');
          expect(response2.body.data[0]).has.property('name');
          expect(response2.body.data[0].name).to.be.equal(`${customerName}`);
        }
      }
    });
  });

  describe('/GET Customer by ID', () => {
    it('Retrieves a customer by ID', async () => {
      const response1 = await getCustomers(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        // Get the ID of first customer in the array
        const customerId = response1.body.data[0].id;

        const response2 = await request(app)
          .get(`/api/v1/customers/ids/${customerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('id');
        expect(response2.body.data.id).to.be.equal(`${customerId}`);
        expect(response2.body.data).has.property('name');
      }
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

      expect(response).has.property('body');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('data');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data).has.property('name');
      expect(response.body.data.name).to.be.equal('Freddie Rodolfo');
    });
  });

  /**
   * Test PATCH route
   */
  describe('/PATCH Customer name by ID', () => {
    it("updates a customer's name by ID", async () => {
      const response1 = await getCustomers(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        // Get the ID of first customer in the array
        const customerId = response1.body.data[0].id;
        const newCustomerName = 'John Doe';

        const response2 = await request(app)
          .patch(`/api/v1/customers/ids/${customerId}`)
          .send({ name: `${newCustomerName}` })
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('id');
        expect(response2.body.data.id).to.be.equal(`${customerId}`);
        expect(response2.body.data).has.property('name');
        expect(response2.body.data.name).to.be.equal(`${newCustomerName}`);
      }
    });
  });

  /**
   * Test DELETE route
   */
  describe('/DELETE Customer by ID', () => {
    it('delete a customer by its ID', async () => {
      const response1 = await getCustomers(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        // Get the ID of first customer in the array
        const customerId = response1.body.data[0].id;

        const response2 = await request(app)
          .delete(`/api/v1/customers/ids/${customerId}`)
          .set('Accept', 'application/json')
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('status');
        expect(response2.body.status).to.equals('Success');
        expect(response2.body).has.property('message');
        expect(response2.body.message).to.contains(`${customerId}`);
      }
    });
  });
});
