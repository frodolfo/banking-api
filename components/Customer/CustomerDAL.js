const db = require('../../data/db');

class CustomerDAL {
  async createCustomer(name) {
    const [id] = await db('customer').insert({ name }).returning('id');

    return id;
  }
}
