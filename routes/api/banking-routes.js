const router = require('express').Router();
const { CustomerController } = require('../../components/Customer/');

router.get('/customers', (req, res) => {});

router.post('/customers', CustomerController.createCustomer);

module.exports = router;
