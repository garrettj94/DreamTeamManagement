const router = require('express').Router();
const userRoutes = require('./userRoutes');
const departmentRoutes = require('./departmentRoutes');
const employeesRoutes = require('./employeesRoutes');

router.use('/users', userRoutes);
router.use('/department', departmentRoutes);
router.use('/employees', employeesRoutes);

module.exports = router;