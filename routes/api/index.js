const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const customerRoutes = require('./customerRoutes');

router.use('/v1', accountRoutes);
router.use('/v1', customerRoutes);

module.exports = router;
