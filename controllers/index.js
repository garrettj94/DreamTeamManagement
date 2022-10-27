const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')

// export routes to be used
router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;