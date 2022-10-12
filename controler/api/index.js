const router = require('express').Router();
const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const teamMemberRoutes = require('./teamMemberRoutes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/teamMembers', teamMemberRoutes);

module.exports = router;