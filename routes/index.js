const router = require('express').Router();
const apiRoutes = require('./api/v1');

router.use('/api', apiRoutes);

module.exports = router;
