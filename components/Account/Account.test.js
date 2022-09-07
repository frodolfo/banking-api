// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const { getAccounts, getCustomers } = require('../../hooks/useData');
const app = require('../../app');

describe('Testing Accounts', () => {
  /**
   * Test POST Routes
   */
  describe('/POST Account Savings', () => {
    it('Creates a new savings account', async () => {
      const response1 = await getCustomers(app);

      const customerId = response1?.body?.data[0]?.id;
      const payload = {
        customer_id: `${customerId}`,
        account_type: 'Savings',
        balance: 5000.0,
      };

      const response2 = await request(app)
        .post('/api/v1/accounts')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response2).has.property('body');
      expect(response2.body).to.be.a('object');
      expect(response2.body).has.property('data');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data).has.property('id');
      expect(response2.body.data.id).to.be.a('string');
      expect(response2.body.data).has.property('customer_id');
      expect(response2.body.data.customer_id).to.equal(
        `${payload.customer_id}`
      );
      expect(response2.body.data).has.property('account_type');
      expect(response2.body.data.account_type).to.equal(
        `${payload.account_type}`
      );
      expect(response2.body.data).has.property('balance');
      expect(parseFloat(response2.body.data.balance)).to.be.equal(
        payload.balance
      );
    });
  });

  describe('/POST Account Checking', () => {
    it('Creates a new checking account', async () => {
      const response1 = await getCustomers(app);

      const customerId = response1?.body?.data[0]?.id;
      const payload = {
        customer_id: `${customerId}`,
        account_type: 'Checking',
        balance: 2400.0,
      };

      const response2 = await request(app)
        .post('/api/v1/accounts')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response2?.body).to.be.a('object');
      expect(response2?.body?.data).to.be.a('object');
      expect(response2?.body?.data?.id).to.be.a('string');
      expect(response2?.body?.data?.customer_id).to.equal(
        `${payload.customer_id}`
      );
      expect(response2?.body?.data?.account_type).to.equal(
        `${payload.account_type}`
      );
      expect(parseFloat(response2?.body?.data?.balance)).to.be.equal(
        payload.balance
      );
    });
  });

  /**
   * Test PATCH Routes
   */
  describe('/PATCH Savings Account Deposit', () => {
    it('Deposits $200 into savings account', async () => {
      const response1 = await getAccounts(app);

      if (response1?.body?.data?.length > 0) {
        const accountId = response1?.body?.data[0]?.id;
        const payload = {
          amount: 200.0,
        };

        const response2 = await request(app)
          .patch(`/api/v1/accounts/ids/${accountId}/deposit`)
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('id');
        expect(response2.body.data.id).to.be.a('string');
        expect(response2.body.data).has.property('account_type');
        expect(response2.body.data.account_type).to.equal(
          `${response1?.body?.data[0].account_type}`
        );
        expect(response2.body.data).has.property('customer_id');
        expect(response2.body.data).has.property('balance');
        expect(parseFloat(response2.body.data.balance)).to.be.equal(
          parseFloat(response1?.body?.data[0].balance) +
            parseFloat(payload.amount)
        );
        expect(response2.body.data).has.property('created_at');
      }
    });
  });

  describe('/PATCH Savings Account Withdrawal', () => {
    it('Withdraws $360 from savings account', async () => {
      const response1 = await getAccounts(app);

      if (response1?.body?.data?.length > 0) {
        const accountId = response1?.body?.data[0]?.id;
        const payload = {
          amount: 360.0,
        };

        const response2 = await request(app)
          .patch(`/api/v1/accounts/ids/${accountId}/withdraw`)
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('id');
        expect(response2.body.data.id).to.be.a('string');
        expect(response2.body.data).has.property('account_type');
        expect(response2.body.data.account_type).to.equal(
          `${response1?.body?.data[0].account_type}`
        );
        expect(response2.body.data).has.property('customer_id');
        expect(response2.body.data).has.property('balance');
        expect(parseFloat(response2.body.data.balance)).to.equal(
          parseFloat(response1?.body?.data[0].balance) -
            parseFloat(payload.amount)
        );
        expect(response2.body.data).has.property('created_at');
      }
    });
  });

  describe('/PATCH Savings Account Transfer', () => {
    it('Transfers $180 from savings account to checking account', async () => {
      const response1 = await getAccounts(app);

      if (response1?.body?.data?.length >= 2) {
        const fromAccountId = response1?.body?.data[0]?.id;
        const toAccountId = response1?.body?.data[1]?.id;
        const payload = {
          toAccountId,
          amount: 180.0,
        };

        const response2 = await request(app)
          .patch(`/api/v1/accounts/ids/${fromAccountId}/transfer`)
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('fromAccount');
        expect(response2.body.data.fromAccount).to.be.a('object');
        expect(response2.body.data.fromAccount).has.property('id');
        expect(response2.body.data.fromAccount.id).to.be.a('string');
        expect(response2.body.data.fromAccount.id).to.equal(`${fromAccountId}`);
        expect(response2.body.data.fromAccount).has.property('account_type');
        expect(response2.body.data.fromAccount.account_type).to.be.a('string');
        expect(response2.body.data.fromAccount).has.property('customer_id');
        expect(response2.body.data.fromAccount.customer_id).to.be.a('string');
        expect(response2.body.data.fromAccount).has.property('balance');
        expect(parseFloat(response2.body.data.fromAccount.balance)).to.equal(
          parseFloat(response1.body.data[0].balance) -
            parseFloat(payload.amount)
        );
        expect(response2.body.data.fromAccount).has.property('created_at');
        expect(response2.body.data.fromAccount.created_at).to.be.a('string');
        expect(response2.body.data).has.property('toAccount');
        expect(response2.body.data.toAccount).to.be.a('object');
        expect(response2.body.data.toAccount).has.property('id');
        expect(response2.body.data.toAccount.id).to.be.a('string');
        expect(response2.body.data.toAccount.id).to.equal(`${toAccountId}`);
        expect(response2.body.data.toAccount).has.property('account_type');
        expect(response2.body.data.toAccount.account_type).to.be.a('string');
        expect(response2.body.data.toAccount).has.property('customer_id');
        expect(response2.body.data.toAccount.customer_id).to.be.a('string');
        expect(response2.body.data.toAccount).has.property('balance');
        expect(parseFloat(response2.body.data.toAccount.balance)).to.equal(
          parseFloat(response1.body.data[1].balance) +
            parseFloat(payload.amount)
        );
        expect(response2.body.data.toAccount).has.property('created_at');
        expect(response2.body.data.toAccount.created_at).to.be.a('string');
      }
    });
  });

  /*
   * Test GET Routes
   */
  describe('/GET No Accounts for Customer by ID', () => {
    it('Retrieves no accounts for a non-existent customer ID', async () => {
      const response1 = await getCustomers(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      const response2 = await request(app)
        .get(`/api/v1/accounts/customers/gibberish`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe('/GET Accounts', () => {
    it('returns all accounts, limited to 10 per page by default', async () => {
      const response = await request(app)
        .get('/api/v1/accounts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response).has.property('body');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('data');
      expect(response.body.data).to.be.a('array');
      // It's okay if there are no accounts available
      expect(response.body.data.length).to.gte(0);
    });
  });

  describe('/GET Account Details by Account ID', () => {
    it('Retrieves an account details by account ID', async () => {
      const response1 = await getAccounts(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the ID of first account in the array
      const accountId = response1.body.data[0].id;

      const response2 = await request(app)
        .get(`/api/v1/accounts/ids/${accountId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response2).has.property('body');
      expect(response2.body).to.be.a('object');
      expect(response2.body).has.property('data');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data).has.property('id');
      expect(response2.body.data.id).to.be.eq(`${accountId}`);
      expect(response2.body.data).has.property('account_type');
      expect(response2.body.data).has.property('customer_id');
      expect(response2.body.data).has.property('balance');
    });
  });

  describe('/GET Account Balance by Account ID', () => {
    it('Retrieves an account balance by account ID', async () => {
      const response1 = await getAccounts(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gt(0);

      // Get the ID of first account in the array
      const accountId = response1.body.data[0].id;

      const response2 = await request(app)
        .get(`/api/v1/accounts/ids/${accountId}/balance`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response2).has.property('body');
      expect(response2.body).to.be.a('object');
      expect(response2.body).has.property('data');
      expect(response2.body.data).to.be.a('object');
      expect(response2.body.data).has.property('balance');
    });
  });

  describe('/GET Accounts by Customer ID', () => {
    it('Retrieves a list of accounts for a customer by customer ID', async () => {
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
          .get(`/api/v1/accounts/customers/${customerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('array');
        expect(response2.body.data.length).to.be.gt(0);
        expect(response2.body.data[0]).has.property('id');
        expect(response2.body.data[0]).has.property('customer_id');
        expect(response2.body.data[0].customer_id).to.be.eq(`${customerId}`);
        expect(response2.body.data[0]).has.property('account_type');
        expect(response2.body.data[0]).has.property('balance');
      }
    });
  });
});
