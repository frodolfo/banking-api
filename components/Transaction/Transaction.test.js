// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const {
  getCustomers,
  getAccounts,
  getTransactions,
} = require('../../hooks/useData');
const app = require('../../app');

describe('Testing Transactions', () => {
  /*
   * Test the GET Routes
   */
  describe('/GET Transactions', () => {
    it('Retrieves all transactions, limited to 10 per page by default', async () => {
      const response = await getTransactions(app);

      expect(response).has.property('body');
      expect(response.body).to.be.a('object');
      expect(response.body).has.property('data');
      expect(response.body.data).to.be.a('array');
      expect(response.body.data.length).to.be.gte(0);
    });
  });

  describe('/GET Transaction by ID', () => {
    it('Retrieves a transaction by its ID', async () => {
      const response1 = await getTransactions(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      // Enure the array is not empty
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        // Get the ID of first transaction in the array
        const transactionId = response1.body.data[0].id;

        const response2 = await request(app)
          .get(`/api/v1/transactions/ids/${transactionId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('object');
        expect(response2.body.data).has.property('id');
        expect(response2.body.data.id).to.be.equal(`${transactionId}`);
        expect(response2.body.data).has.property('customer_id');
        expect(response2.body.data).has.property('transaction_date');
        expect(response2.body.data).has.property('amount');
      }
    });
  });

  describe('/GET Transactions for Customer', () => {
    it('Retrieves all transactions for customer using customer ID', async () => {
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
          .get(`/api/v1/transactions/customers/${customerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response2).has.property('body');
        expect(response2.body).to.be.a('object');
        expect(response2.body).has.property('data');
        expect(response2.body.data).to.be.a('array');
        expect(response2.body.data.length).to.be.gte(0);

        if (response2.body.data.length > 0) {
          expect(response2.body.data[0]).has.property('id');
          expect(response2.body.data[0]).has.property('customer_id');
          expect(response2.body.data[0].customer_id).to.be.eq(`${customerId}`);
          expect(response2.body.data[0]).has.property('transaction_type');
          expect(response2.body.data[0]).has.property('transaction_date');
          expect(response2.body.data[0]).has.property('amount');
        }
      }
    });
  });

  // const transactionDetails = {
  //         account_id: account?.id,
  //         customer_id: account?.customer_id,
  //         amount: account?.balance,
  //         transaction_type: 'Deposit',
  //         transaction_date: account?.created_at,
  //       };

  //       // Log transaction
  //       await TransactionDAL.createTransaction(transactionDetails);

  /**
   * Test POST route
   */
  describe('/POST Transactions', () => {
    it('Creates a $200 deposit transaction for a customer', async () => {
      const response1 = await getAccounts(app);

      expect(response1).has.property('body');
      expect(response1.body).to.be.a('object');
      expect(response1.body).has.property('data');
      expect(response1.body.data).to.be.a('array');
      expect(response1.body.data.length).to.be.gte(0);

      if (response1.body.data.length > 0) {
        // Get the customer ID of the first customer in the array
        const accountId = response1.body.data[0].id;
        const customerId = response1.body.data[0].customer_id;
        const depositAmount = 200.0;
        let payload = {
          amount: depositAmount,
        };

        const response2 = await request(app)
          .patch(`/api/v1/accounts/ids/${accountId}/deposit`)
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(201);

        let payload2 = {
          account_id: accountId,
          customer_id: customerId,
          amount: parseFloat(depositAmount),
          transaction_type: 'Deposit',
          transaction_date: `${response2.body.data.created_at}`,
        };

        const response3 = await request(app)
          .post('/api/v1/transactions')
          .send(payload2)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response3).has.property('body');
        expect(response3.body).to.be.a('object');
        expect(response3.body).has.property('data');
        expect(response3.body.data).to.be.a('object');
        expect(response3.body.data).has.property('id');
        expect(response3.body.data).has.property('customer_id');
        expect(response3.body.data.customer_id).to.be.eq(
          `${payload2.customer_id}`
        );
        expect(response3.body.data).has.property('account_id');
        expect(response3.body.data.account_id).to.be.eq(
          `${payload2.account_id}`
        );
        expect(response3.body.data).has.property('transaction_type');
        expect(response3.body.data.transaction_type).to.be.eq(
          `${payload2.transaction_type}`
        );
        expect(response3.body.data).has.property('transaction_date');
        expect(response3.body.data.transaction_date).to.be.eq(
          `${payload2.transaction_date}`
        );
        expect(response3.body.data).has.property('amount');
        expect(parseFloat(response3.body.data.amount)).to.be.eq(
          parseFloat(payload2.amount)
        );
      }
    });
  });
});
