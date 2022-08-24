const router = require('express').Router();
const bankingRoutes = require('./banking-routes');

router.use('/bank', bankingRoutes);

module.exports = router;
