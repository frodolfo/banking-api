const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');

describe('Testing customers', () => {
  //   before((done) => {
  //     knex.migrate
  //       .latest(config.test)
  //       .then(() => {
  //         return knex.seed.run();
  //       })
  //       .then(() => done())
  //       .catch(done);
  //   });

  it('Lists all customers', (done) => {
    request(app)
      .get('/api/v1/customers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body.data).to.be.a('array');
        expect(response.body.data.length).to.above(0);
        done();
      })
      .catch((e) => {
        console.log(e);
        done();
      });
  });

  it('Retrieves a customer by name', (done) => {
    request(app)
      .get('/api/v1/customers/names/Arisha Barron')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const reqBody = response.body;
        expect(reqBody).to.be.a('object');
        expect(reqBody.data).to.be.a('object');
        expect(reqBody.data.name).to.be.equal('Arisha Barron');
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it('Retrieves a customer by ID', (done) => {
    let resp = request(app)
      .get('/api/v1/customers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        let customerId = response[0].data.id;
        request(app)
          .get(`/api/v1/customers/ids/${customerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            const reqBody = response.body;
            expect(reqBody).to.be.a('object');
            expect(reqBody.data).to.be.a('object');
            expect(reqBody.data.name).to.be.equal(`${customerId}`);
            done();
          })
          .catch((e) => {
            console.log(e);
          });
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it('Creates a new customer', (done) => {
    request(app)
      .post('/api/v1/customers')
      .send({ name: 'Freddie Rodolfo' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((err, res) => {
        if (err) done(err);
        const reqBody = res.body;
        expect(reqBody).to.be.a('object');
        expect(reqBody.data).to.be.a('object');
        expect(reqBody.data).to.be.a('object');
        expect(reqBody.data.name).to.be.equal('Freddie Rodolfo');
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
