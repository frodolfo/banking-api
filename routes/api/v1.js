const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const customerRoutes = require('./customerRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/v1', accountRoutes);
router.use('/v1', customerRoutes);
router.use('/v1', transactionRoutes);

module.exports = router;
