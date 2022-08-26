const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const customerRoutes = require('./customerRoutes');

router.use('/api', accountRoutes);
router.use('/api', customerRoutes);

module.exports = router;
