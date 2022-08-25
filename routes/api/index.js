const router = require('express').Router();
const bankingRoutes = require('./banking-routes');

router.use('/api', bankingRoutes);

module.exports = router;
